import { Request, Response } from "express";
import { comingMoviesRepositry } from "../utils/service";

export const handleComingMovie = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const data = await comingMoviesRepositry.find();
    if (!data) {
      res.status(401).json({ message: "Upcoming movie not found" });
      return;
    }

    res.status(200).json(data);
  } catch (err) {
    res.status(500).json({ message: "Internal Server Error" });
    return;
  }
};
