import { AppSourcedata } from "../config/database";
import { City, Day, Movie, Screen, Theatre } from "../models/movie";
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

      for (const dayData of cityData.days) {
        const day = new Day();
        day.day = dayData.day;
        day.city = city;

        await AppSourcedata.getRepository(Day).save(day);

        for (const theatreData of dayData.theatres) {
          const theatre = new Theatre();
          theatre.name = theatreData.name;
          theatre.chain = theatreData.chain;
          theatre.location = theatreData.location;
          theatre.day = day;

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
    }
  }

  console.log("Seeding completed!");
};
