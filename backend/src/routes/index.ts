import express from "express";
import multer from "multer";
import { createRoom } from "../controllers/createRoom";
import { register, login } from "../controllers/auth";
import { createFile } from "../controllers/upload";
import { MulterReq } from "../types/interface";
import { v4 as uuidv4 } from "uuid";
import path from "path";
import { checkAuth } from "../controllers/middleware";
import expressWs from "express-ws";

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

router.post("/name/create", createRoom); // probably works idk
router.post("/login", login);
router.post("/register", register);

// auth stuff idk
router.post("/register", register);
router.post("/login", login);

router.use("/upload", checkAuth);
router.post("/upload", upload.single("file"), (req, res, next) =>
  createFile(req as MulterReq, res, next)
);

router.ws("/ws", (ws, req) => {
  console.log("connected");
  ws.on("message", (msg) => {
    //@ts-ignore
    let data = JSON.parse(msg);
    switch (data.type) {
      case "message":
        ws.send(msg);
        break;
      case "join":
        ws.send(msg);
        break;
      case "temp":
        ws.send(msg);
        console.log("hi");
        break;
      default:
        ws.send(msg);
        break;
    }
    ws.send(msg);
  });
});
export { router };
