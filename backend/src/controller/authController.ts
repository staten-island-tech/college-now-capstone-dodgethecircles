import { NextFunction, Request, Response } from "express";
import bcrypt from "bcryptjs";
import User from "../models/user";
import jwt from "jsonwebtoken";
import { configDotenv } from "dotenv";

configDotenv();

const generateToken = async function (user: any) {
  const token = jwt.sign({ _id: user._id }, `${process.env.SECRET}`, {
    expiresIn: 60 * 60,
  });
  /* user.tokens.push({ token });
  await user.save(); */
  // end commented code

  return token;
};
export const register = async function (req: Request, res: Response) {
  if (!req.body.username || !req.body.password) {
    res.json({ success: false, msg: "Please pass username and password." });
  } else {
    console.log(req.body.password);
    var newUser = new User({
      username: req.body.username,
      password: req.body.password,
    });
    const token = await generateToken(newUser);
    // save the user
    await newUser.save();
    res.json({
      success: true,
      msg: "Successful created new user.",
      newUser,
      token,
    });
  }
};
export const login = async (req: Request, res: Response) => {
  try {
    let username = req.body.username;
    let password = req.body.password;
    const user = await User.findOne({ username });

    if (!user) {
      throw new Error("Unable to login");
    }
    //@ts-ignore
    const isMatch = await bcrypt.compare(password, user.password);
    const token = await generateToken(user);
    if (!isMatch) {
      throw new Error("Unable to login");
    }

    res.send({ user, token });
  } catch (error) {
    console.log(error);
    res.status(400).send("user not found");
  }
};
export const authCheck = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const token = req.header("Authorization").replace("Bearer ", "");
    const decoded = jwt.verify(token, `${process.env.SECRET}`);
    const user = await User.findOne({
      _id: decoded._id,
    });

    if (!user) {
      throw new Error();
    }
    // maybe you can set body values like below?
    req.body.token = token;
    req.body.user = user; //route hanlder now will not have to fetch the user account
    next();
  } catch (e) {
    res.status(401).send({ error: "Please authenticate." });
  }
};
export const protectedroute = async (req: Request, res: Response) => {
  let user = req.body.user;
  try {
    res.json({ user });
  } catch (error) {
    res.status(500).json(error);
  }
};
