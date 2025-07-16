import express from "express";
import {
  CreateInterviewAndGenerateQuestions,
  getUserInterviews,
  getSingleInterviews,
  getInterviewByJoinCode,
} from "../Controllers/interview.js";

const interviewRoutes = express.Router();

// Example route for creating an interview
interviewRoutes.post("/create", CreateInterviewAndGenerateQuestions);
interviewRoutes.get("/user/:uid", getUserInterviews);
interviewRoutes.get("/single/:id", getSingleInterviews);
interviewRoutes.get("/join/:joinCode", getInterviewByJoinCode);




export default interviewRoutes;
