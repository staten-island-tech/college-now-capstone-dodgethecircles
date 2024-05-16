import express from "express";
import multer from "multer";
import expressWs from "express-ws";
import path from "path";
import { v4 as uuidv4 } from "uuid";
import { MulterReq } from "../types/interface";
import { createRoom } from "../controllers/createRoom";
import { register, login } from "../controllers/auth";
import { uploadPfp } from "../controllers/upload";
import { checkAuth } from "../controllers/middleware";
import { wsConnect } from "../controllers/ws";
import { getLeaderboard } from "../controllers/score";

// const storage = multer.diskStorage({
//   filename: function (req, file, cb) {
//     cb(null, uuidv4() + path.extname(file.originalname));
//   },
// });
const storage = multer.mongoDbBufferStorage({
  url: "mongodb://localhost:27017",
  collection: "uploads",
  metadata: function (req: Request, file: , cb: Function) {
    cb(null, { fieldname: uuidv4() + file.fieldname });
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

//router.use("/upload", checkAuth); need secret key
router.post("/upload", upload.single("file"), (req, res, next) =>
  uploadPfp(req as MulterReq, res, next)
);

router.get("/file", (req, res) => {
  //send the image as part of a json object

  res.json({
    name: "joe",
    image: path.resolve(__dirname, "../../public/download.jpg"),
  });
});
router.ws("/ws", (ws, req) => wsConnect(ws, req));
export { router };
