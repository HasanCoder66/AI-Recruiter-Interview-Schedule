// controllers/interview.js
import Interview from "../Models/interview.js";
import User from "../Models/user.js";
import { generateWithGemini } from "../Services/googleGenerativeai.js";

export const CreateInterviewAndGenerateQuestions = async (req, res) => {
  try {
    const { jobTitle, jobDescription, interviewDuration, interviewType, uid } =
      req.body;

    if (!jobTitle || !jobDescription || !uid) {
      return res
        .status(400)
        .json({ error: "Title, description and uid are required." });
    }

    // user find in db
    const user = await User.findOne({ uid });

    // agr user nhi to error
    if (!user) {
      return res.status(404).json({
        error: "User Not Found",
      });
    }

    // checking users plan if user cross his free interview limits then user should be upgrade his plan.
    if (user.plan === "free" && user.interviewsCreated >= 5) {
      return res.status(403).json({
        error:
          "You have reached your free interview limit. Please Upgrade your Plan",
      });
    }

    // Ensure interviewType is array
    const interviewTypeArray = Array.isArray(interviewType)
      ? interviewType
      : interviewType.split(",").map((t) => t.trim());

    const prompt = `You are an Interviewer.
Generate ${interviewDuration} worth of interview questions for the following types: ${interviewTypeArray.join(
      ", "
    )}.
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
      userId: user._id,
    });

    await newInterview.save();

    user.interviewsCreated += 1;
    await user.save();

    res.status(200).json({
      message: "Interview Created & Questions Generated Successfully",
      data: newInterview,
    });
  } catch (err) {
    console.error("Gemini error:", err);
    res
      .status(500)
      .json({ error: "Failed to Create Interview & generate questions" });
  }
};

// // Get All User Interviews
export const getUserInterviews = async (req, res) => {
  try {
    const { uid } = req.params;

    const user = await User.findOne({ uid });
    // const user = await User.findOne({ uid });

    if (!user) {
      return res.status(404).json({
        error: "User Not Found",
      });
    }

    // find user interviews
    const userInterviews = await Interview.find({ userId: user._id }).sort({
      createdAt: -1,
    });

    res.status(200).json({
      Success: "true",
      data: userInterviews,
    });
  } catch (error) {
    console.error("Error fetching user interviews:", error);
    res.status(500).json({
      error: "Failed to Fetch User Interviews",
    });
  }
};


// Get Single Interview
export const getSingleInterviews = async (req, res) => {
  try {
    const { id } = req.params;

    const interview = await Interview.findById(id);

    if (!interview) {
      return res.status(404).json({ error: "Interview not found" });
    }

    res.status(200).json({ success: true, data: interview });
  } catch (error) {
    console.error("Error fetching interview:", error.message);
    res.status(500).json({
      error: "Failed to fetch interview details",
    });
  }
};

// export const getInterviewStats = async (req, res) => {
//   try {
//     const { uid } = req.params;
//     const user = await User.findOne({ uid });

//     if (!user) return res.status(404).json({ error: "User not found" });

//     const totalAllowed = user.plan === "free" ? 5 : Infinity;

//     res.status(200).json({
//       interviewsCreated: user.interviewsCreated,
//       interviewsRemaining: totalAllowed === Infinity ? "Unlimited" : totalAllowed - user.interviewsCreated,
//     });
//   } catch (err) {
//     res.status(500).json({ error: "Failed to fetch stats" });
//   }
// };
