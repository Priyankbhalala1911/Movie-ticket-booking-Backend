import { Router } from "express";
import {
  handlegetUser,
  handleLogin,
  handleLogout,
  handleRegistration,
} from "../controllers/user";

const router: Router = Router();

router
  .post("/register", handleRegistration)
  .post("/login", handleLogin)
  .get("/me", handlegetUser)
  .post("/logout", handleLogout);

export default router;
