import express from "express";
import { createRoom } from "../controller/createRoom";
import { login } from "../controller/authController";

const router = express.Router();

router.post("/name/create", createRoom); // probably works idk
router.post("/login", login);

export { router };
