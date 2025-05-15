import "reflect-metadata";
import { DataSource } from "typeorm";
import { User } from "../models/user";
import "dotenv/config";
import { Seat } from "../models/seat";
import { MovieNews } from "../models/movieNews";
import { SeatBooking } from "../models/seatBooking";
import { ComingMovies } from "../models/comingMovies";
import { Movie } from "../models/movie";
import { City } from "../models/city";
import { Theatre } from "../models/theater";
import { Day } from "../models/day";
import { ShowTime } from "../models/showTime";
import { Screen } from "../models/screen";
// import { AddMovieNews } from "../utils/Addedmovie/AddMovieNews";
// import { AddDStaticData } from "../utils/Addedmovie/AddMovie";
// import { AddComingMovies } from "../utils/Addedmovie/ComingMovies";

export const AppSourcedata = new DataSource({
  type: "postgres",
  url: process.env.DATABASE_URL,
  synchronize: false,
  logging: false,
  entities: [
    User,
    Movie,
    City,
    Theatre,
    Screen,
    Day,
    ShowTime,
    MovieNews,
    Seat,
    SeatBooking,
    ComingMovies,
  ],
  migrations: ["src/migrations/*.ts"],
  schema: "public",
  ssl: {
    rejectUnauthorized: true,
  },
});

export const initialDatabase = async () => {
  try {
    await AppSourcedata.initialize();
    // await AddDStaticData();
    // await AddMovieNews();
    // await AddComingMovies();
    console.log("Database connection established successfully.");
  } catch (error) {
    console.log("Error connecting to the database", error);
  }
};
