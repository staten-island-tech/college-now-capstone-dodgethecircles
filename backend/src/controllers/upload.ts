import { Request, Response } from "express";
import User from "../models/user";
import { v4 as uuidv4 } from "uuid";
import { MulterReq } from "../types/interface";

export const uploadPfp = async (
  req: MulterReq,
  res: Response,
  next: Function
) => {
  const user = await User.findOne({
    tokens: { $in: [req.headers.authorization] },
  });
  if (!user) {
    res.json({ success: false, msg: "Invalid token" });
    return;
  }
  console.log(req.file);
  const path = uuidv4();
  req.file.filename = path + req.file.filename.split(".")[1];
  try {
    res.status(201).json({
      msg: "File uploaded successfully",
    });
  } catch (error) {
    res.status(500).json({
      msg: error,
    });
  }
  next();
};
