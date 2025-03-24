import "reflect-metadata";
import { DataSource } from "typeorm";
import { User } from "../models/user";

export const AppSourcedata = new DataSource({
  type: "postgres",
  host: "localhost",
  port: 5432,
  username: "postgres",
  database: "tixid_movie_ticket_booking",
  password: "Priyank@4545",
  //   synchronize: true,
  //   logging: true,
  entities: [User],
});

export const initialDatabase = async () => {
  try {
    await AppSourcedata.initialize();
    console.log("Database connection established successfully.");
  } catch (error) {
    console.log("Error connecting to the database", error);
  }
};
