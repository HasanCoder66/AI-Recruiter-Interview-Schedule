import mongoose from "mongoose";

const InterviewSchema = new mongoose.Schema({
  jobTitle: String,
  jobDescription: String,
  interviewType: [String],
  interviewDuration: String,
  questions: [String], // Array of AI-generated questions
  createdAt: {
      type: Date,
      default: Date.now,
    },
    //   timestamps:true,
});

const Interview = mongoose.model("Interview", InterviewSchema);
export default Interview;
