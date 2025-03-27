import { Request, Response } from "express";
import { AppSourcedata } from "../config/database";
import { Movie } from "../models/movie";

export const handleMovieApi = async (
  req: Request,
  res: Response
): Promise<any> => {
  const moviedata = await AppSourcedata.getRepository(Movie).find();

  return res.json(moviedata);
};

export const handleMovieById = async (
  req: Request,
  res: Response
): Promise<any> => {
  const movieDataById = await AppSourcedata.getRepository(Movie).findOne({
    where: { movie_id: req.params.id },
  });

  if (!movieDataById)
    return res.status(401).json({ message: "movie not found" });

  return res.json(movieDataById);
};
