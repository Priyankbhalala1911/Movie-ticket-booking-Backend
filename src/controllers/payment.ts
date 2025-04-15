import { Request, Response } from "express";
import { RazorPatInstance } from "../lib/razorpayInstance";
import crypto from "crypto";
import { SeatBooking } from "../models/seatBooking";
import { AppSourcedata } from "../config/database";
import { Movie } from "../models/movie";
import { Seat } from "../models/seat";

export const PaymentOrder = async (
  req: Request,
  res: Response
): Promise<any> => {
  const { amount } = req.body;
  try {
    const razorpayInstane = RazorPatInstance();
    const option = {
      amount: Number(amount * 100),
      currency: "INR",
      receipt: `receipt_order_${Date.now()}`,
    };

    razorpayInstane.orders.create(option, (err, order) => {
      if (err) {
        console.log(err);
        res.status(500).json({ message: "soemthing went wrong" });
      }
      res.status(200).json({ data: order });
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const PaymentVerify = async (
  req: Request,
  res: Response
): Promise<any> => {
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
      const userId = (req as any).user?.id;
      if (!userId) return res.status(401).json({ message: "Unauthorized" });

      const movie = await AppSourcedata.getRepository(Movie).findOne({
        where: { movie_id: selectedMovie.movie_id },
      });

      if (!movie) {
        return res.status(404).json({ message: "Movie not found" });
      }

      selectedMovie.seat_number.map(async (seat: any) => {
        await AppSourcedata.getRepository(Seat).update(seat.id, {
          status: "confirmed",
        });
      });

      const selectedSeat = selectedMovie.seat_number.map(
        (seat: any) => seat.seat_number
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
      seatbooking.user = { id: userId } as any;

      await AppSourcedata.getRepository(SeatBooking).save(seatbooking);
      res
        .status(200)
        .json({ message: "Seat booked successfully", id: seatbooking.id });
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
