// controllers/interview.js
import { nanoid } from "nanoid";
import crypto from "crypto";
import Interview from "../Models/interview.js";
import User from "../Models/user.js";
import { generateWithGemini } from "../Services/googleGenerativeai.js";
import dotenv from "dotenv";

dotenv.config();

export const CreateInterviewAndGenerateQuestions = async (req, res) => {
  try {
    const DEV_URL =
      process.env.DEV_URL ||
      "https://ai-recruiter-interview-schedule.vercel.app/";
    // console.log(DEV_URL);
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

    //  🔐 Generate joinCode
    const joinCode = crypto.randomBytes(4).toString("hex"); // e.g., '9f83ab2c'
    const joinURL = `${DEV_URL}join/${joinCode}`;
    // const joinURL = `https://localhost:3000/join/${joinCode}`;

    const newInterview = new Interview({
      jobTitle,
      jobDescription,
      interviewType: interviewTypeArray,
      interviewDuration,
      questions,
      userId: user._id,
      joinCode,
      joinURL,
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

// getInterviewByJoinCode
export const getInterviewByJoinCode = async (req, res) => {
  const { joinCode } = req.params;

  try {
    const interview = await Interview.findOne({ joinCode });

    if (!interview) {
      return res.status(404).json({ error: "Interview not found" });
    }

    res.status(200).json({ success: true, data: interview });
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch interview" });
  }
};







export const getInterviewWithVapiSession = async (req, res) => {
  const { joinCode } = req.params;

  try {
    // STEP 1: Find interview
    const interview = await Interview.findOne({ joinCode });

    if (!interview) {
      return res.status(404).json({ error: "Interview not found" });
    }

    const questions = interview.questions || [];

    // STEP 2: Format messages for VAPI (first welcome, then questions)
    const welcomeMessages = [
      {
        role: "user",
        content: `Hello! I'm your virtual interviewer for today. Let's get started in a moment.`,
      },
      {
        role: "user",
        content: `I will ask you a few interview questions. Please answer clearly when prompted. Ready?`,
      },
    ];

    const questionMessages = questions.map((q, i) => ({
      role: "user",
      content: `Question ${i + 1}: ${q}`,
    }));

    const allMessages = [...welcomeMessages, ...questionMessages];

    // STEP 3: Call VAPI to create a conversation
    const vapiRes = await axios.post(
      "https://api.vapi.ai/conversation", // replace with actual VAPI endpoint if needed
      {
        agentId: process.env.VAPI_AGENT_ID,
        messages: allMessages,
      },
      {
        headers: {
          Authorization: `Bearer ${process.env.VAPI_API_KEY}`,
          "Content-Type": "application/json",
        },
      }
    );

    const vapiData = vapiRes.data;

    // STEP 4: Return all together
    return res.status(200).json({
      success: true,
      interview,
      vapiSessionId: vapiData.id, // or .conversationId depending on VAPI format
    });

  } catch (err) {
    console.error("Error in VAPI Interview API:", err);
    res.status(500).json({ error: "Failed to start interview session" });
  }
};






// Join Interveiw
// export const JoinInterview = async (req, res) => {
//   try {
//     const { joinCode } = req.params;
//     const { name } = req.body;

//     const interview = await Interview.findOne({ joinCode });
//     if (!interview) {
//       return res.status(404).json({
//         error: "Interview Not Found",
//       });
//     }

//     interview.candidates.push({ name });
//     await interview.save();

//     res.status(200).json({
//       success: true,
//       data: interview,
//     });
//   } catch (error) {
//     console.error("Error when Candidate Join Interview", error);
//   }
// };

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
