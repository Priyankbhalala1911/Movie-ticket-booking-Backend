import { Router } from "express";
import { selecteScreen } from "../controllers/screen";

const router = Router();

router.get("/:id", selecteScreen);

export default router;
