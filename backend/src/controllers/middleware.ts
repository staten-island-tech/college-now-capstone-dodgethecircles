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
	console.log(req.headers.authorization)
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ message: "Please Provide Auth Token" });
  }

  const authToken = authHeader.slice(7);

  try {
    jwt.verify(authToken, process.env.SECRET_KEY as string);
  } catch (err) {
    if (err instanceof jwt.TokenExpiredError) {
      return res.status(401).json({ success: false, message: "Token expired" });
    }
    return res.status(401).json({ success: false, message: "Invalid token" });
  }

  req.body.user = await User.findOne({ token: req.headers.authorization });
  next();
}
