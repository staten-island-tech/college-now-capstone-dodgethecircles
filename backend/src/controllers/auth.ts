import jwt from "jsonwebtoken";
import User from "../models/user";
import bcrypt from "bcryptjs";
import dotenv from "dotenv";
import { Request, Response } from "express";

dotenv.config();

const generateToken = async function (user: any) {
  return jwt.sign({ _id: user._id }, `${process.env.SECRET_KEY}`, {
    expiresIn: 60 * 60 * 60,
  });
};

export const register = async (req: Request, res: Response) => {
  if (
    Object.keys(req.body).length !== 2 ||
    !req.body.username ||
    !req.body.password
  ) {
    res.status(400).json({
      msg: "Please pass only username and password.",
    });
    return;
  } else if (req.body.username.length < 6) {
    res.status(400).json({
      msg: "Username must be at least 6 characters.",
    });
    return;
  } else if (req.body.password.length < 8) {
    res.status(400).json({
      msg: "Password must be at least 8 characters.",
    });
    return;
  }

  const exists = await User.findOne({
    username: req.body.username,
  });
  if (exists) {
    res.status(401).json({ msg: "Username already exists." });
    return;
  }

  const user = new User(req.body);
  try {
    await user.save();
    await generateToken(user).then((token: String) => {
      user.tokens.push(token);
      user.save();

      res.status(201).send(user);
    });
  } catch (error) {
    if (error instanceof Error) res.status(400).send({ msg: error.message });
    else {
      console.log(error);
      res.status(400).send({ msg: "An error occurred." });
    }
  }
};

export const login = async (req: Request, res: Response) => {
  try {
    const user = await User.findOne({ username: req.body.username });

    if (!user) {
      throw new Error("User does not exist");
    }
    //@ts-ignore
    const isMatch = await bcrypt.compare(req.body.password, user.password);
    if (!isMatch) {
      throw new Error("Invalid credentials.");
    }

    await generateToken(user);
    res.status(200).send(user);
  } catch (error) {
    res.status(400).send(error);
  }
};
