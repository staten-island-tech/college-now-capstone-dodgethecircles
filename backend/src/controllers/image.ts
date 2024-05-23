import { Response, Request, NextFunction } from "express";
import User from "../models/user";
import { v4 as uuidv4 } from "uuid";
import { MulterReq } from "../types/interface";
import path from "path";

export const uploadPfp = async (
  req: MulterReq,
  res: Response,
  next: NextFunction
) => {
  console.log(req.file);
  req.file.filename = req.file.filename;
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

export const getImage = async (req: Request, res: Response) => {
  try {
    res.sendFile(path.resolve("./public/" + req.params.id));
  } catch (error) {
    res.sendFile(path.resolve("./public/default_pfp.svg"));
  }
};
