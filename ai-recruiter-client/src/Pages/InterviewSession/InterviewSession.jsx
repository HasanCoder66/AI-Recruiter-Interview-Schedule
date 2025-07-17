import React, { useEffect } from "react";
import {
  Box,
  Typography,
  IconButton,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import MicIcon from "@mui/icons-material/Mic";
import CallEndIcon from "@mui/icons-material/CallEnd";
import Vapi from "@vapi-ai/web";
import { useSelector } from "react-redux";

const InterviewSession = () => {


// console.log(import.meta.env.VITE_VAPI_PUBLIC_KEY); // Should print a real key

  const vapi = new Vapi(import.meta.env.VITE_VAPI_PUBLIC_KEY);
  const { questions, currentQuestionIndex } = useSelector(
    (state) => state.interview
  );
  console.log("Questions : ", questions);
  console.log(questions);


  const formattedQuestions = questions.map((q, i) => `${i + 1}. ${q}`).join("\n");

  const assistantOptions = {
    name: "AI Recruiter",
    firstMessage:
      "Hi {{fullName}}, how are you? Ready for your interview on {{jobTitle}}?",
    transcriber: {
      provider: "deepgram",
      model: "nova-2",
      language: "en-US",
    },
   voice: {
    provider: "playht",
    voiceId: "Jennifer" // ✅ Only this
  },
    model: {
      provider: "google",
      model: "models/gemini-2.0-flash-exp",
      messages: [
        {
          role: "system",
          content: `
You are an AI voice assistant conducting interviews.
Your job is to ask candidates provided interview questions, assess their responses.
Begin the conversation with a friendly introduction, setting a relaxed yet professional tone. Example:
"Hey there! Welcome to your {{jobTitle}} interview. Let’s get started with a few questions!"
Ask one question at a time and wait for the candidate’s response before proceeding. Keep the questions clear and concise. Below Are the questions ask one by one:
Questions: {{formattedQuestions}}

If the candidate struggles, offer hints or rephrase the question without giving away the answer. Example:
"Need a hint? Think about how React tracks component updates!"

Provide brief, encouraging feedback after each answer. Example:
"Nice! That’s a solid answer."
"Hmm, not quite! Want to try again?"

Keep the conversation natural and engaging—use casual phrases like "Alright, next up..." or "Let’s tackle a tricky one!"

After 5-7 questions, wrap up the interview smoothly by summarizing their performance. Example:
"That was great! You handled some tough questions well. Keep sharpening your skills!"

End on a positive note:
"Thanks for chatting! Hope to see you crushing projects soon!"

Key Guidelines:
✅ Be friendly, engaging, and witty
✅ Keep responses short and natural, like a real conversation
✅ Adapt based on the candidate’s confidence level
✅ Ensure the interview remains focused on React
`.trim(),
        },
      ],
    },
  };

// STart vapi 
  useEffect(() => {
  vapi.start(assistantOptions);
}, []);

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  return (
    <Box
      sx={{
        minHeight: "100vh",
        py: 4,
        px: 2,
        color: "black",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
      className="bg-gray-100"
    >
      {/* Header */}
      <Box
        width="100%"
        maxWidth="1000px"
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        mb={3}
        px={isMobile ? 1 : 2}
      >
        <Typography variant="h6" fontWeight="600">
          AI Interview Session
        </Typography>
        <Typography fontSize={14}>⏱ 00:05:23</Typography>
      </Box>

      {/* Video Section */}
      <Box
        display="flex"
        flexWrap="wrap"
        justifyContent="center"
        gap={3}
        width="100%"
        maxWidth="1000px"
        mb={4}
      >
        {/* AI Interviewer */}
        <Box
          sx={{
            position: "relative",
            flex: "1 1 300px",
            maxWidth: 450,
            minHeight: 400,
            borderRadius: 3,
            overflow: "hidden",
            width: "100%",
            boxShadow: "rgba(0, 0, 0, 0.24) 0px 3px 8px",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            backgroundColor: "white",
          }}
        >
          <img
            src="https://avatars.githubusercontent.com/u/140997677?v=4"
            alt="AI Interviewer"
            style={{
              width: "100px",
              height: "100px",
              borderRadius: "50%",
              objectFit: "cover",
            }}
          />
          <Typography
            variant="caption"
            sx={{
              position: "absolute",
              bottom: 8,
              left: 8,
              backgroundColor: "rgba(0,0,0,0.6)",
              padding: "2px 6px",
              borderRadius: 2,
              fontSize: "0.75rem",
              color: "white",
            }}
          >
            AI Interviewer
          </Typography>
        </Box>

        {/* You */}
        <Box
          sx={{
            position: "relative",
            flex: "1 1 300px",
            maxWidth: 450,
            minHeight: 400,
            borderRadius: 3,
            overflow: "hidden",
            boxShadow: "rgba(0, 0, 0, 0.24) 0px 3px 8px",
            width: "100%",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            backgroundColor: "white",
          }}
        >
          <img
            src="https://randomuser.me/api/portraits/men/32.jpg"
            alt="You"
            style={{
              width: "100px",
              height: "100px",
              borderRadius: "50%",
              objectFit: "cover",
            }}
          />
          <Typography
            variant="caption"
            sx={{
              position: "absolute",
              bottom: 8,
              left: 8,
              backgroundColor: "rgba(0,0,0,0.6)",
              padding: "2px 6px",
              borderRadius: 2,
              fontSize: "0.75rem",
              color: "white",
            }}
          >
            You
          </Typography>
        </Box>
      </Box>

      {/* Control Buttons */}
      <Box display="flex" gap={3} alignItems="center" flexWrap="wrap">
        <IconButton
          sx={{
            backgroundColor: "#1E293B",
            color: "white",
            "&:hover": { backgroundColor: "#334155" },
          }}
          size="large"
        >
          <MicIcon />
        </IconButton>
        <IconButton
          sx={{
            backgroundColor: "#EF4444",
            color: "white",
            "&:hover": { backgroundColor: "#DC2626" },
          }}
          size="large"
        >
          <CallEndIcon />
        </IconButton>
      </Box>

      {/* Footer Text */}
      <Typography
        variant="body2"
        mt={3}
        sx={{ color: "#94A3B8", fontSize: "0.9rem" }}
      >
        Interview in progress...
      </Typography>
    </Box>
  );
};

export default InterviewSession;
