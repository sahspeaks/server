import express from "express";
const app = express();
import { connectMongo } from "./db.js";
import { config } from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors";
import path from "path";
import bodyParser from "body-parser";
import cloudinary from "cloudinary";

app.use(bodyParser.json());

const FRONTEND_URL = "http://localhost:3000";
connectMongo();

config({
  path: "./config/.env",
});

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

app.use(express.json());
app.use(
  express.urlencoded({
    extended: true,
  })
);
app.use(cookieParser());
app.use(
  cors({
    origin: [FRONTEND_URL],
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE"],
  })
);

app.get("/", (req, res) => {
  res.send("Hello World");
});
//routes

import user from "./routes/userRoutes.js";
import employee from "./routes/empRoutes.js";
import ErrorMiddleware from "./middlewares/error.js";

app.use("/api/v1", user);
app.use("/api/v1", employee);

let port = process.env.PORT;
if (port == null || port == "") {
  port = 5000;
}
app.listen(port, () => {
  console.log("Server started at port 5000");
});
app.use(ErrorMiddleware);
