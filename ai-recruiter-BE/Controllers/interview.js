// Generate Interview Questions

import Interview from "../Models/interview.js";
import { generateWithOpenAI } from "../Services/openai.js";

export const CreateInterviewAndGenerateQuestions = async (req, res) => {
  try {
    // Extract necessary data from request body
    const { jobTitle, jobDescription, interviewDuration, interviewType } =
      req.body;
    const formattedTypes = Array.isArray(interviewType)
      ? interviewType.join(", ")
      : interviewType;
    // console.log(req.body, "Body Data");
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

    // Create the prompt for OpenAI
    const prompt = `You are an Interviewer. 
Generate ${interviewDuration} worth of interview questions for the following types: ${formattedTypes}.
Position: ${jobTitle}
Job Description: ${jobDescription}
Each question should be clear, relevant, and focused on its type.`;

    // Call OpenAI
    const questions = await generateWithOpenAI(prompt);

    // ✅ Save to MongoDB
    const newInterview = new Interview({
      jobTitle,
      jobDescription,
      interviewType,
      interviewDuration,
      questions,
    });

    await newInterview.save();

    // For demonstration, we will just log the data and send a success response
    res.status(200).json({
      message: "Interview Created & Questions Generated Successfully",
      data: newInterview,
    });
  } catch (err) {
    console.error("OpenAI error:", err);
    res.status(500).json({ error: "Failed to Create Interview & generate questions" });
  }
};