import mongoose from "mongoose";

const candidateSchema = new mongoose.Schema({
  fullName: {
    type: String,
    required: true,
  },
  interviewId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Interview",
    required: true,
  },
  joinCode: {
    type: String,
    required: true,
  },
  joinedAt: {
    type: Date,
    default: Date.now,
  },
  avatarUrl: {
    type: String,
    default: "", // optional: AI generated or initials-based avatar
  },
});

export default mongoose.model("Candidate", candidateSchema);
