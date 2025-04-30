import { Request, Response } from "express";
import cloudinary from "../lib/cloudinary";
import { userRepositry } from "../utils/service";

interface AuthenticatedRequest extends Request {
  user?: {
    id: string;
  };
}

export const uploadImage = async (
  req: AuthenticatedRequest,
  res: Response
): Promise<void> => {
  try {
    if (!req.file?.path) {
      res.status(400).json({ message: "File path is missing" });
      return;
    }

    const result = cloudinary.v2.uploader.upload(req.file.path, {
      folder: "tixid-movie-ticket-booking",
    });

    const imageurl = (await result).secure_url;

    const userId = req.user?.id;
    if (!userId) {
      res.status(401).json({ message: "Unauthorized" });
      return;
    }

    await userRepositry.update({ id: userId }, { profile_image: imageurl });

    res.status(200).json({ message: "Upload Profile Picture", imageurl });
  } catch (err) {
    res.status(500).json({ message: "Upload failed" });
  }
};

export const getUser = async (
  req: AuthenticatedRequest,
  res: Response
): Promise<void> => {
  try {
    const userId = req.user?.id;
    if (!userId) {
      res.status(401).json({ message: "Unauthorized" });
      return;
    }

    const user = await userRepositry.findOne({
      where: { id: userId },
    });

    if (!user) {
      res.status(401).json({ message: "User not found" });
      return;
    }
    res.status(200).json({ user });
  } catch (err) {
    res.status(500).json({ message: "Internal Server Error" });
    return;
  }
};

export const updateUser = async (
  req: AuthenticatedRequest,
  res: Response
): Promise<void> => {
  try {
    const { name, email } = req.body;

    const userId = req.user?.id;
    if (!userId) {
      res.status(401).json({ message: "Unauthorized" });
      return;
    }

    const user = await userRepositry.update(
      {
        id: userId,
      },
      { name: name, email: email }
    );

    if (!user) {
      res.status(401).json({ message: "User not found" });
      return;
    }
    res.status(200).json({ message: "User Updated Succeefully", user });
  } catch (err) {
    res.status(500).json({ message: "Internal Server Error" });
    return;
  }
};
