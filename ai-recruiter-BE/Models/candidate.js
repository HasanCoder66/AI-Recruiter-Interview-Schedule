// import mongoose from "mongoose";

// const candidateSchema = new mongoose.Schema({
//   fullName: {
//     type: String,
//     required: true,
//   },
//   interviewId: {
//     type: mongoose.Schema.Types.ObjectId,
//     ref: "Interview",
//     required: true,
//   },
//   joinCode: {
//     type: String,
//     required: true,
//   },
//   joinedAt: {
//     type: Date,
//     default: Date.now,
//   },
//   avatarUrl: {
//     type: String,
//     default: "", // optional: AI generated or initials-based avatar
//   },
//   answers: [
//     {
//       question: String,
//       answer: String,
//     },
//   ],
//   score: Number,
//   status: {
//     type: String,
//     enum: ["Pending", "Completed"],
//     default: "Pending",
//   },

//   feedback: {
//     overallRating: { type: Number, default: 0 },
//     skills: [
//       {
//         label: String,
//         score: Number,
//       },
//     ],
//     summary: String,
//     recommendation: String,
//     recommendationReason: String,
//   },
// });

// export default mongoose.model("Candidate", candidateSchema);




import mongoose from "mongoose";

const candidateSchema = new mongoose.Schema({
  fullName: { type: String, required: true },
  interviewId: { type: mongoose.Schema.Types.ObjectId, ref: "Interview", required: true },
  joinCode: { type: String, required: true },
  joinedAt: { type: Date, default: Date.now },
  answers: [
    {
      question: { type: String },
      answer: { type: String }
    }
  ],
  score: { type: Number, default: 0 },
  status: { type: String, enum: ["Pending", "Completed"], default: "Pending" },
  feedback: { type: Object }, // JSON from Gemini
});

export default mongoose.model("Candidate", candidateSchema);