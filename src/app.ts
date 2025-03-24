import express from "express";
import { initialDatabase } from "./config/database";
import UserRouter from "./routes/user";
import cors from "cors";
const app = express();
import "dotenv/config";

app.use(cors());
app.use(express.json());
app.use("/", UserRouter);

initialDatabase();
app.listen(process.env.PORT || 8100, () =>
  console.log(`server is running on port ${process.env.PORT}`)
);
