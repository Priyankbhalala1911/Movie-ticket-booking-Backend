import express from "express";
import { initialDatabase } from "./config/database";
import UserRouter from "./routes/user";
import MovieRouter from "./routes/movie";
import MovieNewsRouter from "./routes/movieNews";
import ScreenRouter from "./routes/screen";
import PaymentRouter from "./routes/payment";
import BookingRouter from "./routes/seatBooking";
import ComingMovie from "./routes/comingMovies";
import cors from "cors";
import cookieParser from "cookie-parser";
import "dotenv/config";

const app = express();
app.use(
  cors({
    origin: process.env.FRONTEND_URL,
    credentials: true,
  })
);
app.use(cookieParser());
app.use(express.json());
app.use("/", UserRouter);
app.use("/movie", MovieRouter);
app.use("/news", MovieNewsRouter);
app.use("/screen", ScreenRouter);
app.use("/payment", PaymentRouter);
app.use("/api", BookingRouter);
app.use("/coming", ComingMovie);

initialDatabase();
app.listen(process.env.PORT || 8100, () =>
  console.log(`server is running on port ${process.env.PORT}`)
);
