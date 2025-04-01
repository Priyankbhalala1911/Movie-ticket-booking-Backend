import { Router } from "express";
import {
  handleAllNews,
  handleMovieNews,
  handleMovieNewsByID,
} from "../controllers/movienews";

const router = Router();

router.get("/all", handleAllNews);
router.get("/", handleMovieNews);
router.get("/:id", handleMovieNewsByID);

export default router;
