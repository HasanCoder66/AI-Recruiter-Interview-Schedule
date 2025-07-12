// console.log("Hello, World!");
import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";

const app = express();

dotenv.config();
const PORT = process.env.PORT || 6000;

const connectDB = async () => {
  mongoose
    .connect(process.env.MONGODB_URI, {})
    .then(() => {
      console.log("MongoDB connected Successfully");
    })
    .catch((err) => {
      console.error("MongoDB connection failed:", err);
      process.exit(1);
    });
};

app.listen(3000, () => {
  connectDB();
  console.log(`Server is running on port ${PORT}`);
});
