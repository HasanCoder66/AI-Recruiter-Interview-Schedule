import express from "express";
import {
  CreateInterviewAndGenerateQuestions,
  getUserInterviews,
} from "../Controllers/interview.js";

const interviewRoutes = express.Router();

// Example route for creating an interview
interviewRoutes.post("/create", CreateInterviewAndGenerateQuestions);
interviewRoutes.get("/user/:uid", getUserInterviews);

export default interviewRoutes;
