import { Router } from "express";
import {
  handlegetUser,
  handleLogin,
  handleLogout,
  handleRegistration,
} from "../controllers/user";
import upload from "../middlewares/multer";
import { getUser, updateUser, uploadImage } from "../controllers/profile";
import { UserAuth } from "../middlewares/userAuth";

const router: Router = Router();

router
  .post("/register", handleRegistration)
  .post("/login", handleLogin)
  .get("/me", handlegetUser)
  .post("/logout", handleLogout)
  .post("/profile", upload.single("image"), UserAuth, uploadImage)
  .get("/user", UserAuth, getUser)
  .post("/updateUser", UserAuth, updateUser);

export default router;
