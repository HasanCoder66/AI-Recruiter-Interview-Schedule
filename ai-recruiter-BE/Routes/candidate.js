import express from "express";
import {
  createCandidate,
  getCandidatesByInterviewId,
} from "../Controllers/candidate.js";

const candidateRoute = express.Router();

candidateRoute.post("/", createCandidate);
candidateRoute.get("/interview/:interviewId", getCandidatesByInterviewId);

export default candidateRoute;
