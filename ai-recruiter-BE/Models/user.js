// models/user.js
import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  uid: String,
  name: String,
  email: String,
  avatar: String,
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.model("User", userSchema);
