import { Request, Response } from "express";
import cloudinary from "../lib/cloudinary";
import { AppSourcedata } from "../config/database";
import { User } from "../models/user";

export const uploadImage = async (
  req: Request,
  res: Response
): Promise<any> => {
  try {
    if (!req.file?.path) {
      return res.status(400).json({ message: "File path is missing" });
    }

    const result = cloudinary.v2.uploader.upload(req.file.path, {
      folder: "tixid-movie-ticket-booking",
    });

    const imageurl = (await result).secure_url;

    const userId = (req as any).user?.id;
    if (!userId) return res.status(401).json({ message: "Unauthorized" });

    await AppSourcedata.getRepository(User).update(
      { id: userId },
      { profile_image: imageurl }
    );

    res.status(200).json({ imageurl });
  } catch (err) {
    res.status(500).json({ message: "Upload failed" });
  }
};

export const getUser = async (req: Request, res: Response): Promise<any> => {
  try {
    const userId = (req as any).user?.id;
    if (!userId) return res.status(401).json({ message: "Unauthorized" });

    const user = await AppSourcedata.getRepository(User).findOne({
      where: { id: userId },
    });

    if (!user) return res.status(401).json({ message: "User not found" });
    return res.status(200).json({ user });
  } catch (err) {
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

export const updateUser = async (req: Request, res: Response): Promise<any> => {
  try {
    const { name, email } = req.body;

    const userId = (req as any).user?.id;
    if (!userId) return res.status(401).json({ message: "Unauthorized" });

    const user = await AppSourcedata.getRepository(User).update(
      {
        id: userId,
      },
      { name: name, email: email }
    );

    if (!user) return res.status(401).json({ message: "User not found" });
    return res.status(200).json({ user });
  } catch (err) {
    return res.status(500).json({ message: "Internal Server Error" });
  }
};
