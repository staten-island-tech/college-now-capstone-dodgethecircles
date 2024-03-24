import express from "express";
import { createRoom } from "../controller/createRoom";
<<<<<<< HEAD
import { register, login } from "../controller/authController";
=======
import {
  login,
  register,
  authCheck,
  protectedroute,
} from "../controller/authController";
>>>>>>> ea8911e (creating ui for the homepage and some backend stuff?)

const router = express.Router();

router.post("/name/create", createRoom); // probably works idk
router.post("/login", login);
router.post("/register", register);

// auth stuff idk
router.post("/register", register);
router.post("/login", login);
router.get("/protected", authCheck, protectedroute);

export { router };
