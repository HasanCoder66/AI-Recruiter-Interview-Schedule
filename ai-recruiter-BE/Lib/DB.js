import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

export const connectDB = async () => {
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