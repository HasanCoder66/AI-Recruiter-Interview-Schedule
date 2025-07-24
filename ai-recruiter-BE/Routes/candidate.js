import express from "express";
import {
  createCandidate,
  generateCandidateFeedback,
  getCandidatesByInterviewId,
  submitInterviewAnswers,
  getCandidateById,
} from "../Controllers/candidate.js";

const candidateRoute = express.Router();

candidateRoute.post("/", createCandidate);
candidateRoute.get("/interview/:interviewId", getCandidatesByInterviewId);
candidateRoute.get("/:candidateId", getCandidateById);
candidateRoute.put("/submit/:candidateId", submitInterviewAnswers);
candidateRoute.post("/feedback/:candidateId", generateCandidateFeedback);

export default candidateRoute;
