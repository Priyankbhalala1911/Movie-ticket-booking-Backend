import { Request, Response } from "express";
import { AppSourcedata } from "../config/database";
import { User } from "../models/user";
import { validate } from "class-validator";
import bcrypt from "bcryptjs";

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
        message: "validation failed..",
        errors: errors.map((err) => ({
          field: err.property,
          message: Object.values(err.constraints!)[0],
        })),
      });
    }

    const saltNumber = 2;
    const hashedPassword = await bcrypt.hash(password, saltNumber);

    user.password = hashedPassword;

    const result = await UserRepositry.save(user);
    return res
      .status(200)
      .json({ message: "Registration Successfullly", result });
  } catch (error: any) {
    return res.status(400).json({ error: error.message });
  }
};

// export const handleLogin = async (req:Request,res:Response):Promise<any> =>{

// }
