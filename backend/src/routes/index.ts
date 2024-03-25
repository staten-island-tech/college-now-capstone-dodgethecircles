import express from "express";
import { createRoom } from "../controller/createRoom";
import {
  login,
  register,
  authCheck,
  protectedroute,
} from "../controller/authController";

const router = express.Router();

router.post("/name/create", createRoom); // probably works idk
router.post("/login", login);
router.post("/register", register);

// auth stuff idk
router.post("/register", register);
router.post("/login", login);
router.get("/protected", authCheck, protectedroute);

export { router };
