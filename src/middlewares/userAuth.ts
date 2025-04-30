import { NextFunction, Response, Request } from "express";

import jwt from "jsonwebtoken";
import { AppSourcedata } from "../config/database";
import { User } from "../models/user";

interface AuthenticatedRequest extends Request {
  user?: User;
}

export const UserAuth = async (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const token = req.cookies.token;
    if (!token) {
      res.status(401).json({ error: "user Unauthorized" });
      return;
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET as string) as {
      id: string;
      name: string;
    };

    const user = await AppSourcedata.getRepository(User).findOne({
      where: { id: decoded.id },
    });
    if (!user) {
      res.status(401).json({ error: "Unauthorized" });
      return;
    }
    req.user = user;
    next();
  } catch (error) {
    res.status(401).json({ error: "Unauthorized" });
  }
};
