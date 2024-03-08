import jwt from "jsonwebtoken";
import User from "../models/user";
import bcrypt from "bcryptjs";
import dotenv from "dotenv";
import { Request, Response } from "express";

dotenv.config();

const generateToken = async function (user: any) {
  // change type for user
  const token = jwt.sign({ _id: user._id }, `${process.env.SECRET}`, {
    expiresIn: 60 * 60,
  });
  return token;
};

export const register = async function (req: Request, res: Response) {
  if (!req.body.username || !req.body.password) {
    res.json({ success: false, msg: "Please pass username and password." });
  } else {
    console.log(req.body.password);
    let newUser = new User({
      username: req.body.username,
      password: req.body.password,
    });
    const token = await generateToken(newUser);
    // save the user
    /* newUser.save(function (err) {
      if (err) {
        return res.json({ success: false, msg: "Username already exists." });
      }
      res.json({
        success: true,
        msg: "Successful created new user.",
        newUser,
        token,
      });
    }); */
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

    const isMatch = await bcrypt.compare(password, user.password);
    const token = await generateToken(user);
    if (!isMatch) {
      throw new Error("Unable to login");
    }
    //DO NOT SEND BACK Password

    res.send({ user, token });
  } catch (error) {
    console.log(error);
    res.status(400).send("user not found");
  }
};
