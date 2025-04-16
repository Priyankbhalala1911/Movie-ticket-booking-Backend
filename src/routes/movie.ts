import { Router } from "express";
import {
  getMovieById,
  handleMovieApi,
  handleMovieById,
} from "../controllers/movie";
const router = Router();

router.get(":id", getMovieById);
router.get("/slot-booking", handleMovieApi);
router.get("/slot-booking/:id", handleMovieById);

export default router;
