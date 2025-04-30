import { Request, Response } from "express";
import { Seat } from "../models/seat";
import { showTimeRepositry } from "../utils/service";
export const selecteScreen = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const SelectedScreen = await showTimeRepositry.findOne({
      where: { id: req.params.id },
      relations: ["seats"],
    });

    if (!SelectedScreen) {
      res.status(404).json({ message: "Screen not found" });
      return;
    }

    SelectedScreen?.seats.sort((a: Seat, b: Seat) => {
      const rowA = a.seat_number.charAt(0);
      const rowB = b.seat_number.charAt(0);

      if (rowA !== rowB) {
        return rowB.localeCompare(rowA);
      }
      const numA = parseInt(a.seat_number.slice(1), 10);
      const numB = parseInt(b.seat_number.slice(1), 10);

      return numA - numB;
    });
    res.json(SelectedScreen);
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" });
  }
};
