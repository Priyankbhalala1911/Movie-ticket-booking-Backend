import { Request, Response } from "express";
import { AppSourcedata } from "../config/database";
import { User } from "../models/user";
import { validate } from "class-validator";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const UserRepositry = AppSourcedata.getRepository(User);

export const handleRegistration = async (
  req: Request,
  res: Response
): Promise<any> => {
  try {
    const { name, email, password } = req.body;

    const userFound = await UserRepositry.findOne({ where: { email } });
    if (userFound) {
      return res.status(400).json({ message: "User already exists" });
    }

    const user: User = new User();
    user.name = name;
    user.email = email;
    user.password = password;

    const errors = await validate(user);
    if (errors.length > 0) {
      return res.status(400).json({
        message: "Validation failed",
        errors: errors.map((err) => ({
          field: err.property,
          message: Object.values(err.constraints!)[0],
        })),
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    user.password = hashedPassword;

    const result = await UserRepositry.save(user);
    return res.status(201).json({ message: "Registration Successful", result });
  } catch (error: any) {
    return res.status(500).json({ error: error.message });
  }
};

export const handleLogin = async (
  req: Request,
  res: Response
): Promise<any> => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res
        .status(400)
        .json({ message: "Email and password are required" });
    }

    const userFound = await UserRepositry.findOne({ where: { email } });
    if (!userFound) {
      return res.status(401).json({ message: "Invalid Credentials" });
    }

    const isPasswordValid = await bcrypt.compare(password, userFound.password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    const token = jwt.sign(
      { id: userFound.id },
      process.env.JWT_SECRET as string,
      {
        expiresIn: "1d",
      }
    );

    return res
      .cookie("token", token, {
        httpOnly: true,
        secure: true,
        sameSite: "strict",
        maxAge: 24 * 60 * 60 * 1000,
      })
      .json({ message: "Login Successfully", name: userFound.name });
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
};

export const handleLogout = async (
  req: Request,
  res: Response
): Promise<any> => {
  res.clearCookie("token");

  return res.json({ message: "Logged out successfully" });
};
