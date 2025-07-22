import express from "express";
import {
  createCandidate,
  getCandidatesByInterviewId,
  submitInterviewAnswers,
} from "../Controllers/candidate.js";

const candidateRoute = express.Router();

candidateRoute.post("/", createCandidate);
candidateRoute.get("/interview/:interviewId", getCandidatesByInterviewId);
candidateRoute.put("/submit/:candidateId", submitInterviewAnswers );

export default candidateRoute;
