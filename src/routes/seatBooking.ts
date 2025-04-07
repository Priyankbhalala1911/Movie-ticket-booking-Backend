import { Router } from "express";
import {
  SeatBookingwithID,
  SeatBookingwithPayment,
} from "../controllers/seatBooking";
import { UserAuth } from "../middlewares/userAuth";

const router = Router();

router.get("/booking", UserAuth, SeatBookingwithPayment);
router.get("/booking/:id", SeatBookingwithID);

export default router;
