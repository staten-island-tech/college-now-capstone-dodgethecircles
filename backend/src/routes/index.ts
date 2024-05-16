import express from "express";
import multer from "multer";
import expressWs from "express-ws";
import path from "path";
import { v4 as uuidv4 } from "uuid";
import { MulterReq } from "../types/interface";
import { createRoom } from "../controllers/createRoom";
import { register, login } from "../controllers/auth";
import { createFile } from "../controllers/upload";
import { checkAuth } from "../controllers/middleware";
import { wsConnect } from "../controllers/ws";
import { getLeaderboard } from "../controllers/score";

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, `uploads/${req.body.user._id}/`);
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

//router.use("/upload", checkAuth);
router.post("/upload", upload.single("file"), (req, res, next) =>
  createFile(req as MulterReq, res, next)
);

router.ws("/ws", (ws, req) => wsConnect(ws, req));
export { router };
