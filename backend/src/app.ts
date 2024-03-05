import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import bodyParser from "body-parser";
import { router } from "./routes";
import connectToMongoDB from "./db/mongoDB";

dotenv.config();
const port = process.env.PORT || 3000;
const app = express();

app.use(cors());

//raw requests are now usable properties on req.body
app.use(express.json());
app.use(
  express.urlencoded({
    extended: true,
  })
);

// Enable the use of request body parsing middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// connectToMongoDB(); // provide mongoDB uri before uncommenting

app.use("/", router);

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

export { app };
