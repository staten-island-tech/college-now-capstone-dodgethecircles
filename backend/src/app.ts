import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import bodyParser from "body-parser";
import { router } from "./routes";
import connectToMongoDB from "./db/mongoDB";
import expressWs from "express-ws";

dotenv.config();
const port = process.env.PORT || 8080;
const app = express();
expressWs(app);

app.use(cors());

//raw requests are now usable properties on req.body
app.use(express.json({ limit: "100mb" }));
app.use(
  express.urlencoded({
    extended: true,
  })
);

// Enable the use of request body parsing middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

connectToMongoDB(); // provide mongoDB uri before uncommenting

app.use("/", router);

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

export { app };
