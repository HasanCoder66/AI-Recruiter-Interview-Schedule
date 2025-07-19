import mongoose from "mongoose";

const InterviewSchema = new mongoose.Schema({
  userId: String,
  jobTitle: String,
  jobDescription: String,
  interviewType: [String],
  interviewDuration: String,
  questions: [String],
  joinCode: {
    type: String,
    required: true,
    unique: true,
  },
  joinURL: {
    type: String,
    required: true,
  },
  candidates: [
    {
      fullName: String,
      joinedAt: { type: Date, default: Date.now },
    },
  ],
  // candidates: [
  //   {
  //     name: String,
  //     joinedAt: {
  //       type: Date,
  //       default: Date.now,
  //     },
  //   },
  // ],
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Interview = mongoose.model("Interview", InterviewSchema);
export default Interview;
