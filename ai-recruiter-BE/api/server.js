// console.log("Hello, World!");
import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import dotenv from "dotenv";
import { connectDB } from "../Lib/DB.js";
import interviewRoutes from "../Routes/interview.js";

const app = express();

dotenv.config();
const PORT = process.env.PORT || 6000;

// Middlewares
app.use(
  cors({
    origin: "*",
    methods: ["GET", "POST", "PUT", "DELETE"],
  })
);
app.use(express.json());
app.use(bodyParser.json());

// API Routes
app.use("/api/interview", interviewRoutes);

// Test Route
app.get("/api/ping", (req, res) => {
  res.json({ message: "Backend working from Vercel!" });
});

//Server Listener
app.listen(3000, () => {
  // connect to mongodb
  connectDB();
  console.log(`Server is running on port ${PORT}`);
});
