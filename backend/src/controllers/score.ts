import User from "../models/user";
import { Request, Response } from "express";

export const getLeaderboard = async (req: Request, res: Response) => {
  try {
    const users = await User.find()
      .sort({ score: -1 })
      .limit(10)
      .select("username highscore -_id");
    res.json(users);
  } catch (err: any) {
    res.status(500).json({ message: err.message });
  }
};

export const updateLevel = async (req: Request, res: Response) => {
  try {
    const user = await User.findOne({ username: req.body.username });
    if (!user) {
      res.status(404).json({ message: "User not found" });
      return;
    }
    if (req.body.score > user.highscore) {
      user.highscore = req.body.score;
      await user.save();
      res.json({ message: "Highscore updated" });
    } else {
      res.json({ message: "Highscore not updated" });
    }
  } catch (err: any) {
    res.status(500).json({ message: err.message });
  }
};
