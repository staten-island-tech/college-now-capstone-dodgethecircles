import User from "../models/user";
import { Request, Response } from "express";

export const getLeaderboard = async (req: Request, res: Response) => {
  try {
    const users = await User.find()
      .sort({ highscore: -1 })
      .limit(10)
      .select("username highscore pfp _id");
    console.log(users);
    res.status(200).json(users);
  } catch (err: any) {
    res.status(500).json({ message: err.message });
  }
};

export const updateLevel = async (req: Request, res: Response) => {
  try {
    if (req.body.score > req.body.user.highscore) {
      req.body.user.highscore = req.body.score;
      await req.body.user.save();
      res.json({ message: "Highscore updated" });
    } else {
      res.json({ message: "Highscore not updated" });
    }
  } catch (err: any) {
    res.status(500).json({ message: err.message });
  }
};
