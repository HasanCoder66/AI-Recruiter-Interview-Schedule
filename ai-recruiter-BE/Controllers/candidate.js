import Candidate from "../Models/candidate.js";
import Interview from "../Models/interview.js";
import { generateWithGemini } from "../Services/googleGenerativeai.js";

// Get Candidates by interview id
export const getCandidatesByInterviewId = async (req, res) => {
  const { interviewId } = req.params;

  try {
    const candidates = await Candidate.find({ interviewId }).sort({
      joinedAt: -1,
    });

    return res.status(200).json({
      totalCandidates: candidates.length,
      candidates,
    });
  } catch (error) {
    console.error("Error fetching candidates:", error);
    return res.status(500).json({ message: "Server Error" });
  }
};

// Get Candidate by id
export const getCandidateById = async (req, res) => {
  try {
    const { candidateId } = req.params;

    if (!candidateId)
      return res.status(400).json({
        message: "Candidate Id is required",
      });

    const candidate = await Candidate.findById(candidateId);

    if (!candidate)
      return res.status(404).json({
        message: "Candidate not Found",
      });

    res.status(200).json({
      success: true,
      message: candidate,
    });
  } catch (error) {
    console.log("Error :", error.message);
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Create Candidate
export const createCandidate = async (req, res) => {
  const { fullName, joinCode } = req.body;

  try {
    const interview = await Interview.findOne({ joinCode });

    if (!fullName)
      return res.status(404).json({
        message: "Name is Required",
      });

    if (!interview) {
      return res.status(404).json({ message: "Invalid join code" });
    }

    const newCandidate = new Candidate({
      fullName,
      interviewId: interview._id,
      joinCode,
    });

    await newCandidate.save();

    return res.status(201).json({
      message: "Candidate joined successfully",
      candidateId: newCandidate._id,
      fullName: newCandidate.fullName,
    });
  } catch (err) {
    console.error("Candidate Join Error:", err);
    return res.status(500).json({ message: "Server error" });
  }
};

// Submit Interviews answers /
export const submitInterviewAnswers = async (req, res) => {
  const { candidateId } = req.params; // Candidate ID
  // console.log(candidateId);
  const { answers } = req.body;
  // console.log(answers);

  try {
    if (!answers || answers.length === 0) {
      return res.status(400).json({ message: "Answers are required" });
    }

    const candidate = await Candidate.findById(candidateId);

    if (!candidate) {
      return res.status(404).json({ message: "Candidate not found" });
    }

    // ✅ Calculate score (example: 2 points per answer)
    // const score = answers.length * 2;

    candidate.answers = answers;
    // candidate.score = score;
    candidate.status = "Completed";

    await candidate.save();

    return res.status(200).json({
      message: "Answers submitted successfully",
      candidate,
    });
  } catch (error) {
    console.error("Error saving answers:", error);
    return res.status(500).json({ message: "Failed to save answers", error });
  }
};

// Generate Candidate Feedback
export const generateCandidateFeedback = async (req, res) => {
  const { candidateId } = req.params;

  try {
    const candidate = await Candidate.findById(candidateId).populate(
      "interviewId"
    );

    if (!candidate) {
      return res.status(404).json({ message: "Candidate not found" });
    }

    if (!candidate.answers || candidate.answers.length === 0) {
      return res
        .status(400)
        .json({ message: "No answers found for this candidate" });
    }

    const jobTitle = candidate.interviewId?.jobTitle || "Unknown Role";

    // ✅ Build Gemini prompt for structured JSON response
    const prompt = `
Analyze this interview and provide a JSON response:
Candidate Name: ${candidate.fullName}
Job Title: ${jobTitle}
Answers:
${candidate.answers
  .map((a, i) => `Q${i + 1}: ${a.question}\nA: ${a.answer}`)
  .join("\n")}

Return JSON only:
{
  "overallRating": number,
  "skills": [
    {"label":"Technical Skills","score":number},
    {"label":"Problem Solving","score":number},
    {"label":"Communication","score":number},
    {"label":"Experience","score":number}
  ],
  "summary": "Short summary",
  "recommendation": "Recommended for Hire or Not Recommended",
  "recommendationReason": "Explain why"
}
`;

    // ✅ Call Gemini service
    const feedback = await generateWithGemini(prompt, "feedback");

    // try {
    //   feedback = JSON.parse(feedbackRaw); // Ensure valid JSON
    // } catch (err) {
    //   console.error("Error parsing Gemini response:", err);
    //   return res.status(500).json({ message: "Invalid AI response" });
    // }

    // ✅ Save feedback in DB
    candidate.feedback = feedback;
    await candidate.save();
    // candidate.feedback = feedback;
    // await candidate.save();

    return res.status(200).json({
      message: "Feedback generated successfully",
      feedback,
    });
  } catch (error) {
    console.error("Error generating feedback:", error);
    res.status(500).json({ message: "Failed to generate feedback" });
  }
};
