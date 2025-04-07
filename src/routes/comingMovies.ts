import { Router } from "express";
import { handleComingMovie } from "../controllers/comingMovies";

const router = Router();

router.get("/movies", handleComingMovie);

export default router;
