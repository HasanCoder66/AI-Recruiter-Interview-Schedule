import express from "express";
import { CreateInterviewAndGenerateQuestions, getAllInterviews } from "../Controllers/interview.js";

const interviewRoutes = express.Router();


// Example route for creating an interview
interviewRoutes.post("/create", CreateInterviewAndGenerateQuestions);
interviewRoutes.get("/all-interviews", getAllInterviews);

export default interviewRoutes;
