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
): Promise<any> => {
  try {
    const token = req.cookies.token;
    console.log("token:   ", token);
    if (!token) return res.status(401).json({ error: "user Unauthorized" });

    const decoded = jwt.verify(token, process.env.JWT_SECRET as string) as {
      id: string;
      name: string;
    };

    const user = await AppSourcedata.getRepository(User).findOne({
      where: { id: decoded.id },
    });
    if (!user) return res.status(401).json({ error: "Unauthorized" });
    req.user = user;
    next();
  } catch (error) {
    return res.status(401).json({ error: "Unauthorized" });
  }
};
