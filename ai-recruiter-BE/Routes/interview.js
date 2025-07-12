import express from "express";
import { createInterview, generateInterviewQustions } from "../Controllers/interview.js";

const interviewRoutes = express.Router();


// Example route for creating an interview
interviewRoutes.post("/generate-que", generateInterviewQustions);
// interviewRoutes.post("/create", createInterview);

export default interviewRoutes;
