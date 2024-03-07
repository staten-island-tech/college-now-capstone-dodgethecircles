import express from "express";
import { createRoom } from "../controller/createRoom";

const router = express.Router();

router.post("/name/create", createRoom); // probably works idk

export { router };
