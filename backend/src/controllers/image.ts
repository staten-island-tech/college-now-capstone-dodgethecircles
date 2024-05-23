import { Response, Request, NextFunction } from "express";
import { MulterReq } from "../types/interface";
import path from "path";

export const uploadPfp = async (
  req: MulterReq,
  res: Response,
  next: NextFunction
) => {
  try {
    req.body.user.pfp = req.file.filename;
    req.body.user.save();
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
