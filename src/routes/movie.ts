import { Router } from "express";
import { handleMovieApi, handleMovieById } from "../controllers/movie";
const router = Router();

router.get("/slot-booking", handleMovieApi);
router.get("/slot-booking/:id", handleMovieById);

export default router;
