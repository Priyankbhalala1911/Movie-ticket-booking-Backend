import { Request, Response } from "express";
import { seatBookingTimeRepositry } from "../utils/service";

interface AuthenticatedRequest extends Request {
  user?: {
    id: number;
  };
}
export const SeatBookingwithPayment = async (
  req: AuthenticatedRequest,
  res: Response
): Promise<void> => {
  try {
    const userId = req.user?.id;
    if (!userId) {
      res.status(401).json({ message: "Unauthorized" });
      return;
    }

    const data = await seatBookingTimeRepositry.find({
      where: { user: { id: userId.toString() } },
    });
    if (!data || data.length === 0) {
      res.status(500).json({ message: "No ticket Booked yet", userId });
      return;
    }
    res.status(200).json(data);
  } catch (error) {
    console.error("Booking error:", error);
    res.status(500).json({ message: "Internal Server Error", error });
  }
};

export const SeatBookingwithID = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const ticket = await seatBookingTimeRepositry.findOne({
      where: { id: req.params.id },
    });

    if (!ticket) {
      res.status(500).json({ message: "Ticket not found" });
      return;
    }
    res.status(200).json(ticket);
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error", error });
  }
};
