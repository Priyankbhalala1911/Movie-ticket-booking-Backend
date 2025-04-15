import { Request, Response } from "express";
import { AppSourcedata } from "../config/database";
import { City, Movie } from "../models/movie";
import { Seat } from "../models/seat";

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
  const { city, day, chain, theater, screenType } = req.query;

  const movieDataById = await AppSourcedata.getRepository(Movie).findOne({
    where: { movie_id: req.params.id },
  });

  if (!movieDataById) {
    return res.status(404).json({ message: "Movie not found" });
  }

  let filteredCities = movieDataById.cities;

  if (city) {
    filteredCities = filteredCities.filter(
      (c) => c.name.toLowerCase() === city.toString().toLowerCase()
    );

    if (filteredCities.length === 0) {
      return res.status(404).json({ message: `No theaters found in ${city}` });
    }
  }

  if (day) {
    filteredCities = filteredCities
      .map((c) => ({
        ...c,
        days: c.days.filter((d) => d.day === Number(day)),
      }))
      .filter((c) => c.days.length > 0);

    if (filteredCities.length === 0) {
      return res.status(404).json({ message: `No shows available on ${day}` });
    }
  }

  if (chain) {
    filteredCities = filteredCities
      .map((c) => ({
        ...c,
        days: c.days
          .map((d) => ({
            ...d,
            theatres: d.theatres.filter(
              (t) => t.chain.toLowerCase() === chain.toString().toLowerCase()
            ),
          }))
          .filter((d) => d.theatres.length > 0),
      }))
      .filter((c) => c.days.length > 0);

    if (filteredCities.length === 0) {
      return res
        .status(404)
        .json({ message: "No Theaters available for this chain" });
    }
  }

  if (theater) {
    filteredCities = filteredCities
      .map((c) => ({
        ...c,
        days: c.days
          .map((d) => ({
            ...d,
            theatres: d.theatres.filter((t) =>
              t.name.toLowerCase().startsWith(theater.toString().toLowerCase())
            ),
          }))
          .filter((d) => d.theatres.length > 0),
      }))
      .filter((c) => c.days.length > 0);

    if (filteredCities.length === 0) {
      return res
        .status(404)
        .json({ message: `No theaters matching "${theater}" found` });
    }
  }

  if (screenType) {
    filteredCities = filteredCities
      .map((c) => ({
        ...c,
        days: c.days
          .map((d) => ({
            ...d,
            theatres: d.theatres
              .map((t) => ({
                ...t,
                screens: t.screens.filter(
                  (s) =>
                    s.type.toLowerCase() === screenType.toString().toLowerCase()
                ),
              }))
              .filter((t) => t.screens.length > 0),
          }))
          .filter((d) => d.theatres.length > 0),
      }))
      .filter((c) => c.days.length > 0);

    if (filteredCities.length === 0) {
      return res.status(404).json({
        message: `No shows available for screen type "${screenType}"`,
      });
    }
  }

  return res.json({ ...movieDataById, cities: filteredCities });
};
