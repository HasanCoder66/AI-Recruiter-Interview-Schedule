// models/user.js
import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  uid: String,
  name: String,
  email: String,
  avatar: String,
  plan: {
    type: String,
    default: 'free' // or 'pro', etc.
  },
  interviewsCreated: {
    type: Number,
    default: 0
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.model("User", userSchema);
