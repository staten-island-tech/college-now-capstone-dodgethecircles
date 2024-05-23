import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import User from "../models/user";
import dotenv from "dotenv";

dotenv.config();

export async function checkAuth(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ message: "Please Provide Auth Token" });
  }

  let data = "";

  jwt.verify(
    authHeader.slice(7),
    process.env.SECRET_KEY as string,
    function (err, decoded) {
      if (err instanceof jwt.TokenExpiredError) {
        return res
          .status(401)
          .json({ success: false, message: "Token expired" });
      } else if (err) {
        return res
          .status(401)
          .json({ success: false, message: "Invalid token" });
      }
      data = decoded as string;
    }
  );

  req.body.user = await User.findOne({ _id: data });
  next();
}
