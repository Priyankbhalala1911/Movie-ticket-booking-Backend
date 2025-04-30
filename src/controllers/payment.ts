import { Request, Response } from "express";
import { RazorPatInstance } from "../lib/razorpayInstance";
import crypto from "crypto";
import { SeatBooking } from "../models/seatBooking";
import {
  movieRepositry,
  seatBookingTimeRepositry,
  seatRepositry,
  userRepositry,
} from "../utils/service";
interface AuthenticatedRequest extends Request {
  user?: {
    id: string;
  };
}

export const PaymentOrder = async (
  req: AuthenticatedRequest,
  res: Response
): Promise<void> => {
  const { amount } = req.body;
  const userId = req.user?.id;
  if (!userId) {
    res.status(401).json({ message: "Unauthorized" });
    return;
  }

  try {
    const razorpayInstane = RazorPatInstance();
    const option = {
      amount: Number(amount * 100),
      currency: "INR",
      receipt: `receipt_order_${Date.now()}`,
    };

    await razorpayInstane.orders.create(option, (err, order) => {
      if (err) {
        console.error("Razorpay order creation failed:", err);
        res.status(500).json({ message: "soemthing went wrong" });
        return;
      }
      res.status(200).json({ data: order });
      return;
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const PaymentVerify = async (
  req: AuthenticatedRequest,
  res: Response
): Promise<void> => {
  try {
    const {
      razorpay_order_id,
      razorpay_payment_id,
      razorpay_signature,
      selectedMovie,
    } = req.body;
    const sign = razorpay_order_id + "|" + razorpay_payment_id;

    const expeactedSign = crypto
      .createHmac("sha256", process.env.RAZORPAY_SECRET_KEY as string)
      .update(sign.toString())
      .digest("hex");

    const isAuthenticated = expeactedSign === razorpay_signature;

    if (isAuthenticated) {
      const userId = req.user?.id;
      if (!userId) {
        res.status(401).json({ message: "Unauthorized" });
        return;
      }

      const movie = await movieRepositry.findOne({
        where: { movie_id: selectedMovie.movie_id },
      });

      if (!movie) {
        res.status(404).json({ message: "Movie not found" });
        return;
      }

      selectedMovie.seat_number.map(
        async (seat: { id: string; seat_number: string[] }) => {
          await seatRepositry.update(seat.id, {
            status: "confirmed",
          });
        }
      );

      const selectedSeat = selectedMovie.seat_number.map(
        (seat: { id: string; seat_number: string[] }) => seat.seat_number
      );

      const seatbooking = new SeatBooking();

      seatbooking.movie_title = movie.title;
      seatbooking.movie_poster = movie.movie_poster;
      seatbooking.location = selectedMovie.location;
      seatbooking.show_type = selectedMovie.type;
      seatbooking.show_date = selectedMovie.date;
      seatbooking.seat_price = selectedMovie.price;
      seatbooking.show_time = selectedMovie.time;
      seatbooking.payment_Id = razorpay_payment_id;
      seatbooking.password_key = Math.random().toString(36).slice(2, 10);
      seatbooking.seat_number = selectedSeat;
      seatbooking.total_amount = selectedMovie.total_amount;
      seatbooking.payment_status = isAuthenticated;
      const user = await userRepositry.findOne({ where: { id: userId } });
      if (!user) {
        res.status(404).json({ message: "User not found" });
        return;
      }
      seatbooking.user = user;

      await seatBookingTimeRepositry.save(seatbooking);
      res
        .status(200)
        .json({ message: "Seat booked successfully", id: seatbooking.id });
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
