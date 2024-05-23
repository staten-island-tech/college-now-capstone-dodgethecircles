import express from "express";
import multer from "multer";
import expressWs from "express-ws";
import path from "path";
import { v4 as uuidv4 } from "uuid";
import { MulterReq } from "../types/interface";
import { createRoom } from "../controllers/createRoom";
import { register, login } from "../controllers/auth";
import { uploadPfp, getImage } from "../controllers/image";
import { checkAuth } from "../controllers/middleware";
import { wsConnect } from "../controllers/ws";
import { getLeaderboard } from "../controllers/score";

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "public/");
  },
  filename: function (req, file, cb) {
    cb(null, uuidv4() + path.extname(file.originalname));
  },
});

const upload = multer({ storage: storage });

const router = express.Router();
//@ts-ignore
expressWs(router);

router.get("/leaderboard", getLeaderboard);

router.post("/name/create", createRoom); // probably works idk
router.post("/login", login);
router.post("/register", register);

router.post("/upload", upload.single("file"), checkAuth, (req, res, next) =>
  uploadPfp(req as MulterReq, res, next)
);

router.get("/pfp/:id", getImage);
router.ws("/ws", (ws, req) => wsConnect(ws, req));
export { router };
