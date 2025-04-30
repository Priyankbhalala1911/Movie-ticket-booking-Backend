import { Request, Response } from "express";
import { movieRepositry } from "../utils/service";

export const handleMovieApi = async (
  req: Request,
  res: Response
): Promise<void> => {
  const moviedata = await movieRepositry.find();
  res.json(moviedata);
  return;
};

export const getMovieById = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const movieData = await movieRepositry.findOne({
      where: { movie_id: req.params.id },
    });

    if (!movieData) {
      res.status(404).json({ message: "Movie not found" });
      return;
    }

    res.status(200).json(movieData);
  } catch (error) {
    console.error("Error fetching movie:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const handleMovieById = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { city, day, chain, theater, screenType } = req.query;

  const movieDataById = await movieRepositry.findOne({
    where: { movie_id: req.params.id },
  });

  if (!movieDataById) {
    res.status(404).json({ message: "Movie not found" });
    return;
  }

  let filteredCities = movieDataById.cities;

  if (city) {
    filteredCities = filteredCities.filter(
      (c) => c.name.toLowerCase() === city.toString().toLowerCase()
    );

    if (filteredCities.length === 0) {
      res.status(404).json({ message: `No theaters found in ${city}` });
      return;
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
      res.status(404).json({ message: `No shows available on ${day}` });
      return;
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
      res.status(404).json({ message: "No Theaters available for this chain" });
      return;
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
      res
        .status(404)
        .json({ message: `No theaters matching "${theater}" found` });
      return;
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
      res.status(404).json({
        message: `No shows available for screen type "${screenType}"`,
      });
      return;
    }
  }

  res.json({ ...movieDataById, cities: filteredCities });
};
