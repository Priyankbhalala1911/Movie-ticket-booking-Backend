import { AppSourcedata } from "../config/database";
import { City, Movie, Screen, Theatre } from "../models/movie";
import { MovieData } from "../data/MovieData";

export const AddDStaticData = async () => {
  for (const movieData of MovieData) {
    const movie = new Movie();
    movie.title = movieData.title;
    movie.genre = movieData.genre;
    movie.duration = movieData.duration;
    movie.director = movieData.director;
    movie.rating = movieData.rating;
    movie.movie_poster = movieData.image;
    movie.release_date = movieData.release_date;
    await AppSourcedata.getRepository(Movie).save(movie);

    for (const cityData of movieData.city) {
      const city = new City();
      city.name = cityData.name;
      city.movie = movie;
      await AppSourcedata.getRepository(City).save(city);

      for (const theatreData of cityData.theatres) {
        const theatre = new Theatre();
        theatre.name = theatreData.name;
        theatre.chain = theatreData.chain;
        theatre.location = theatreData.location;
        theatre.city = city;
        await AppSourcedata.getRepository(Theatre).save(theatre);

        for (const screenData of theatreData.screens) {
          const screen = new Screen();
          screen.type = screenData.type;
          screen.price = screenData.price;
          screen.slots = screenData.slots;
          screen.theatre = theatre;
          await AppSourcedata.getRepository(Screen).save(screen);
        }
      }
    }
    await AppSourcedata.getRepository(Movie).save(movie);
  }

  console.log("Seeding completed!");
};
