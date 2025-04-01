import "reflect-metadata";
import { DataSource } from "typeorm";
import { User } from "../models/user";
import "dotenv/config";
import { City, Day, Movie, Screen, Theatre } from "../models/movie";
import { AddDStaticData } from "../utils/AddMovie";
import { MovieNews } from "../models/movieNews";
import { AddMovieNews } from "../utils/AddMovieNews";

export const AppSourcedata = new DataSource({
  type: "postgres",
  url: process.env.DATABASE_URL,
  synchronize: true,
  logging: false,
  entities: [User, Movie, City, Theatre, Screen, Day, MovieNews],
  schema: "public",
  ssl: {
    rejectUnauthorized: false,
  },
});

export const initialDatabase = async () => {
  try {
    await AppSourcedata.initialize();
    // await AddDStaticData();
    // await AddMovieNews();
    console.log("Database connection established successfully.");
  } catch (error) {
    console.log("Error connecting to the database", error);
  }
};
