import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import dotenv from "dotenv";
import { connectDB } from "../Lib/DB.js";
import interviewRoutes from "../Routes/interview.js";
import authRoute from "../Routes/auth.js";

dotenv.config();
const app = express();
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
app.use("/api/auth", authRoute);
app.use("/api/interview", interviewRoutes);

// Test Route
app.get("/api/ping", (req, res) => {
  res.json({ message: "Backend working from Vercel!" });
});

// Connect DB and Start Server
connectDB()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`✅ Server running on PORT: ${PORT}`);
    });
  })
  .catch((err) => {
    console.error("❌ Failed to connect DB:", err);
  });