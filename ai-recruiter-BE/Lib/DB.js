import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

export const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log("✅ MongoDB connected successfully");
  } catch (err) {
    console.error("❌ MongoDB connection failed:", err.message);
    // Don't force crash on Vercel — just throw and let server.js handle
    throw err;
  }
};



// import mongoose from "mongoose";
// import dotenv from "dotenv";

// dotenv.config();

// export const connectDB = async () => {
//   mongoose
//     .connect(process.env.MONGODB_URI, {})
//     .then(() => {
//       console.log("MongoDB connected Successfully");
//     })
//     .catch((err) => {
//       console.error("MongoDB connection failed:", err);
//       process.exit(1);
//     });
// };