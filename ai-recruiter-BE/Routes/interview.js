import express from "express";
import { CreateInterviewAndGenerateQuestions } from "../Controllers/interview.js";

const interviewRoutes = express.Router();


// Example route for creating an interview
interviewRoutes.post("/create", CreateInterviewAndGenerateQuestions);

export default interviewRoutes;
