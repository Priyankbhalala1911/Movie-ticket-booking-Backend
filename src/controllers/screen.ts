import { Request, Response } from "express";
import { AppSourcedata } from "../config/database";
import { Screen, ShowTime } from "../models/movie";
import { Seat } from "../models/seat";
export const selecteScreen = async (
  req: Request,
  res: Response
): Promise<any> => {
  try {
    const SelectedScreen = await AppSourcedata.getRepository(ShowTime).findOne({
      where: { id: req.params.id },
      relations: ["seats"],
    });

    if (!SelectedScreen) {
      return res.status(404).json({ message: "Screen not found" });
    }

    SelectedScreen?.seats.sort((a: Seat, b: Seat) => {
      const rowA = a.seat_number.charAt(0);
      const rowB = b.seat_number.charAt(0);

      if (rowA !== rowB) {
        return rowA.localeCompare(rowB);
      }
      const numA = parseInt(a.seat_number.slice(1), 10);
      const numB = parseInt(b.seat_number.slice(1), 10);

      return numA - numB;
    });
    return res.json(SelectedScreen);
  } catch (error) {
    return res.status(500).json({ message: "Internal Server Error" });
  }
};
