import express from "express";
import { PORT, mongoDB_URL } from "./config.js";
import mongoose from "mongoose";
import userRoute from "./routes/userRoute.js";
import sessionRoute from "./routes/sessionRoute.js";
import cors from "cors";
import dotenv from "dotenv";
// require("dotenv").config();
dotenv.config();

const app = express();

app.use(express.json());

app.use(cors());
app.get("/", (req, res) => {
  console.log(req);
  return res.status(234).send("Welcome to MERN stack");
});

app.use("/user", userRoute);
app.use("/session", sessionRoute);

mongoose
  .connect(process.env.MONGO)
  .then(() => {
    console.log("App connected to database");
    app.listen(5555, () => {
      console.log("App is listening to port: 5555");
    });
  })
  .catch(() => {
    console.log(error);
  });
