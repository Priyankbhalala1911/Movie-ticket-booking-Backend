import express from "express";
import { initialDatabase } from "./config/database";
import UserRouter from "./routes/user";
import cors from "cors";
const app = express();

app.use(cors());
app.use(express.json());
app.use("/", UserRouter);

initialDatabase();
app.listen(8000, () => console.log("server is running on port 8000"));
