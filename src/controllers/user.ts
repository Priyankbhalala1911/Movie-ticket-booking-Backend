import { Request, Response } from "express";
import { User } from "../models/user";
import { validate } from "class-validator";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { userRepositry } from "../utils/service";

export const handleRegistration = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { name, email, password } = req.body;

    const userFound = await userRepositry.findOne({ where: { email } });
    if (userFound) {
      res.status(400).json({ message: "User already exists" });
      return;
    }

    const user: User = new User();
    user.name = name;
    user.email = email;
    user.password = password;

    const errors = await validate(user);
    if (errors.length > 0) {
      res.status(400).json({
        message: "Validation failed",
        errors: errors.map((err) => ({
          field: err.property,
          message: Object.values(err.constraints!)[0],
        })),
      });
      return;
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    user.password = hashedPassword;

    const result = await userRepositry.save(user);
    res.status(201).json({ message: "Registration Successful", result });
  } catch (error) {
    res.status(500).json({ error: error });
  }
};

export const handleLogin = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      res.status(400).json({ message: "Email and password are required" });
      return;
    }

    const userFound = await userRepositry.findOne({ where: { email } });
    if (!userFound) {
      res.status(401).json({ message: "Invalid Credentials" });
      return;
    }

    const isPasswordValid = await bcrypt.compare(password, userFound.password);
    if (!isPasswordValid) {
      res.status(401).json({ message: "Invalid email or password" });
      return;
    }

    const token = jwt.sign(
      { id: userFound.id },
      process.env.JWT_SECRET as string,
      {
        expiresIn: "1d",
      }
    );

    res
      .cookie("token", token, {
        httpOnly: true,
        secure: true,
        sameSite: "none",
        path: "/",
        maxAge: 24 * 60 * 60 * 1000,
      })
      .json({ message: "Login Successfully", name: userFound.profileImage });
  } catch (err) {
    res.status(500).json({ error: err });
  }
};

export const handlegetUser = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const token = req.cookies.token;
    if (!token) {
      res.status(401).json({ error: "Unauthorized" });
      return;
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET as string) as {
      id: string;
      name: string;
    };
    res.json(decoded.name);
  } catch (error) {
    res.status(401).json({ error: "Unauthorized" });
  }
};

export const handleLogout = async (
  req: Request,
  res: Response
): Promise<void> => {
  res.clearCookie("token");

  res.json({ message: "Logged out successfully" });
};
