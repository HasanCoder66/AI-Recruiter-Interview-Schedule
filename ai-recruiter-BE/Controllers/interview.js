// controllers/interview.js
import Interview from "../Models/interview.js";
import { generateWithGemini } from "../Services/googleGenerativeai.js";

export const CreateInterviewAndGenerateQuestions = async (req, res) => {
  try {
    const { jobTitle, jobDescription, interviewDuration, interviewType } = req.body;

    if (!jobTitle || !jobDescription) {
      return res.status(400).json({ error: "Title and description are required." });
    }

    // Ensure interviewType is array
    const interviewTypeArray = Array.isArray(interviewType)
      ? interviewType
      : interviewType.split(",").map((t) => t.trim());

    const prompt = `You are an Interviewer.
Generate ${interviewDuration} worth of interview questions for the following types: ${interviewTypeArray.join(", ")}.
Position: ${jobTitle}
Job Description: ${jobDescription}
Each question should be clear, relevant, and focused on its type.`;

    const questions = await generateWithGemini(prompt);

    const newInterview = new Interview({
      jobTitle,
      jobDescription,
      interviewType: interviewTypeArray,
      interviewDuration,
      questions,
    });

    await newInterview.save();

    res.status(200).json({
      message: "Interview Created & Questions Generated Successfully",
      data: newInterview,
    });
  } catch (err) {
    console.error("Gemini error:", err);
    res.status(500).json({ error: "Failed to Create Interview & generate questions" });
  }
};


// Get All Interviews
export const getAllInterviews = async (req, res) => {
  try {
    const interviews = await Interview.find().sort({ createdAt: -1 }); // newest first
    res.status(200).json(interviews);
  } catch (error) {
    console.error("Error fetching interviews:", error);
    res.status(500).json({ error: "Failed to fetch interviews" });
  }
};
