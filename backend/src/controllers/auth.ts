import jwt from "jsonwebtoken";
import User from "../models/user";
import bcrypt from "bcryptjs";
import dotenv from "dotenv";
import { Request, Response } from "express";

dotenv.config();

const generateToken = async function (user: any) {
  return jwt.sign({ _id: user._id }, `${process.env.SECRET_KEY}`, {
    expiresIn: 60 * 60,
  });
};

export const register = async (req: Request, res: Response) => {
  if (
    Object.keys(req.body).length !== 2 ||
    !req.body.username ||
    !req.body.password
  ) {
    res.json({
      success: false,
      msg: "Please pass only username and password.",
    });
    return;
  } else if (req.body.username.length < 6) {
    res.json({
      success: false,
      msg: "Username must be at least 6 characters.",
    });
    return;
  } else if (req.body.password.length < 6) {
    res.json({
      success: false,
      msg: "Password must be at least 6 characters.",
    });
    return;
  }

  const exists = await User.findOne({
    username: req.body.username,
  });
  if (exists) {
    res.json({ success: false, msg: "Username already exists." });
    return;
  }

  const user = new User(req.body);
  try {
    await user.save();
    const token = await generateToken(user);
    res
      .status(201)
      .send({ success: true, user: { ...user, password: undefined }, token });
  } catch (error) {
    res.status(400).send(error);
  }
};

export const login = async (req: Request, res: Response) => {
  try {
    let username = req.body.username;
    let password = req.body.password;
    const user = await User.findOne({ username });

    if (!user) {
      throw new Error("User does not exist");
    }
    //@ts-ignore
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      throw new Error("Unable to login");
    }

    const token = await generateToken(user);
    //@ts-ignore
    user.password = undefined;
    res.status(200).send({ success: true, user });
  } catch (error) {
    console.log(error);
    res.status(400).send("user not found");
  }
};
