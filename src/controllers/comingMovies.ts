import { Request, Response } from "express";
import { AppSourcedata } from "../config/database";
import { ComingMovies } from "../models/comingMovies";

export const handleComingMovie = async (
  req: Request,
  res: Response
): Promise<any> => {
  try {
    const data = await AppSourcedata.getRepository(ComingMovies).find();
    if (!data)
      return res.status(401).json({ message: "Upcoming movie not found" });

    return res.status(200).json(data);
  } catch (err) {
    return res.status(500).json({ message: "Internal Server Error" });
  }
};
