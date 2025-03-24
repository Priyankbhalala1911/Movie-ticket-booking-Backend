import { Router } from "express";
import { handleLogin, handleRegistration } from "../controllers/user";

const router: Router = Router();

router.post("/register", handleRegistration).post("/login", handleLogin);

export default router;
