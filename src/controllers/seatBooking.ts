import { Request, Response } from "express";
import { AppSourcedata } from "../config/database";
import { SeatBooking } from "../models/seatBooking";

export const SeatBookingwithPayment = async (
  req: Request,
  res: Response
): Promise<any> => {
  try {
    const userId = (req as any).user?.id;
    if (!userId) return res.status(401).json({ message: "Unauthorized" });

    const data = await AppSourcedata.getRepository(SeatBooking).find({
      where: { user: { id: userId } },
    });
    if (!data)
      return res.status(500).json({ message: "No ticket Booked", userId });
    res.status(200).json(data);
  } catch (error) {
    console.error("Booking error:", error);
    res.status(500).json({ message: "Internal Server Error", error });
  }
};

export const SeatBookingwithID = async (
  req: Request,
  res: Response
): Promise<any> => {
  try {
    const ticket = await AppSourcedata.getRepository(SeatBooking).findOne({
      where: { id: req.params.id },
    });

    if (!ticket) return res.status(500).json({ message: "Ticket not found" });
    res.status(200).json(ticket);
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error", error });
  }
};
