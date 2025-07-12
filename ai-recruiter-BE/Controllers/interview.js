// Generate Interview Questions

import { generateWithOpenAI } from "../Services/openai.js";

export const generateInterviewQustions = async (req, res) => {
  try {
    // Extract necessary data from request body
    const { jobTitle, jobDescription, interviewDuration, interviewType } =
      req.body;

    console.log(req.body, "Body Data");
    // console.log("Job Title", jobTitle);
    // console.log("jobDescription", jobDescription);
    // console.log("interviewDuration", interviewDuration);
    // console.log("interviewType", interviewType);

    // Here you would typically call a service or function to generate questions based on the provided data

    if (!jobTitle || !jobDescription) {
      return res.status(400).json({
        error: "Title and description are required.",
      });
    }

    const prompt = `You are an AI Interviewer. 
    Generate 8 interview questions for a ${interviewType} interview.
    Position: ${jobTitle}
Job Description: ${jobDescription}
Each question should be clear and concise.
    `;

    const questions = await generateWithOpenAI(prompt)
    // For demonstration, we will just log the data and send a success response
    res.status(200).json({
      message: "Interview Questions Generated Successfully",
      data: questions,
    });
  } catch (err) {
    console.error("OpenAI error:", err);
    res.status(500).json({ error: "Failed to generate questions" });
  }
};

export const createInterview = (req, res) => {
  try {
    // Extract interview data from request body

    res.status(200).json({
      message: "Interview created successfully",
    });
  } catch (error) {
    console.error("Error creating interview:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
