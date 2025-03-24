import "reflect-metadata";
import { DataSource } from "typeorm";
import { User } from "../models/user";
import "dotenv/config";

export const AppSourcedata = new DataSource({
  type: "postgres",
  host: process.env.DATABASE_HOST,
  port: process.env.DATABASE_PORT
    ? parseInt(process.env.DATABASE_PORT)
    : undefined,
  username: process.env.DATABASE_USER,
  database: process.env.DATABASE_NAME,
  password: process.env.DATABASE_PASSWORD,
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
