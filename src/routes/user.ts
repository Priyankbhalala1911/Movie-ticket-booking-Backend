import { Router } from "express";
import { handleRegistration } from "../controllers/user";

const router: Router = Router();

router.post("/register", handleRegistration);

export default router;
