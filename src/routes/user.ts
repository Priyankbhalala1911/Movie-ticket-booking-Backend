import { Router } from "express";
import {
  handleLogin,
  handleLogout,
  handleRegistration,
} from "../controllers/user";

const router: Router = Router();

router
  .post("/register", handleRegistration)
  .post("/login", handleLogin)
  .post("/logout", handleLogout);

export default router;
