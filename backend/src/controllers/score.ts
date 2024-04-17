import User from "../models/user";
import { Request, Response } from "express";

export const getLeaderboard = async (req: Request, res: Response) => {
  try {
    const users = await User.find()
      .sort({ score: -1 })
      .limit(10)
      .select("username score -_id");
    res.json(users);
  } catch (err: any) {
    res.status(500).json({ message: err.message });
  }
};
