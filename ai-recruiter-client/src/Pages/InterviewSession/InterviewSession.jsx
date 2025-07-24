// import React, { useEffect, useState, useRef } from "react";
// import axios from "axios";
// import {
//   Box,
//   Typography,
//   IconButton,
//   Avatar,
//   useMediaQuery,
//   useTheme,
//   CircularProgress,
// } from "@mui/material";
// import MicIcon from "@mui/icons-material/Mic";
// import MicOffIcon from "@mui/icons-material/MicOff";
// import CallEndIcon from "@mui/icons-material/CallEnd";
// import CallIcon from "@mui/icons-material/Call";
// import Vapi from "@vapi-ai/web";
// import { useSelector } from "react-redux";
// import { BASE_URL, BASE_URL_PROD } from "../../constants/baseUrl";
// import {
//   Dialog,
//   DialogTitle,
//   DialogContent,
//   DialogActions,
//   Button,
// } from "@mui/material";

// const InterviewSession = () => {
//   const vapi = new Vapi(import.meta.env.VITE_VAPI_PUBLIC_KEY);
//   const theme = useTheme();
//   const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
//   const [isActiveUser, setIsActiveUser] = useState(false);
//   const [openDialog, setOpenDialog] = useState(false);
//   const timerRef = useRef(null);
//   const [duration, setDuration] = useState(0);
//   const [isMicOn, setIsMicOn] = useState(true);

//   const { interviewData, questions } = useSelector((state) => state.interview);
//   const { candidateName, candidateId } = useSelector(
//     (state) => state?.candidate
//   );
//   const fullName = candidateName || "Candidate";
//   const jobTitle = interviewData?.jobTitle || "Software Engineer";

//   const startCall = () => {
//     startTimer();
//     // formatTime()
//     const formattedQuestions = questions?.map((q, i) => ` ${q}`).join(",");
//     // console.log(formattedQuestions);

//     const assistantOptions = {
//       name: "AI Recruiter",
//       voice: { provider: "playht", voiceId: "Jennifer" },
//       transcriber: { provider: "deepgram", model: "nova-2", language: "en-US" },
//       firstMessage: `Hi ${fullName}! 👋 How are you doing today?`,
//       model: {
//         provider: "google",
//         model: "gemini-1.5-pro",
//         messages: [
//           {
//             role: "system",
//             content: `
// You are a smart and friendly AI recruiter conducting a voice-based interview.

// Start by greeting the candidate and waiting for their response:
// "Hi there! 👋 How are you doing today?"

// Once they respond, say:
// "Welcome to your ${jobTitle} interview. Let's get started."

// Ask one question at a time from this list:
// ${formattedQuestions}

// Wait for their full response before moving on.

// If they hesitate or sound stuck, gently say:
// "It’s totally okay. Shall we move to the next question?"

// End the interview with:
// "Great work ${fullName}! Best of luck. I’m generating your interview summary now."
// `.trim(),
//           },
//         ],
//       },
//     };

//     vapi.start(assistantOptions);
//   };

//   vapi.on("call-start", (data) => {
//     console.log("Call has Started");
//     // toast("Call Connected")
//   });

//   vapi.on("call-end", (data) => {
//     console.log("Call has Ended");
//     // toast("Interview End")
//   });

//   vapi.on("speech-start", (data) => {
//     console.log("AI Assistan Speech Start");
//     setIsActiveUser(false);
//   });

//   vapi.on("speech-end", (data) => {
//     console.log("AI Assistan Speech End");
//     setIsActiveUser(true);
//   });

//   vapi.on("message", (message) => {
//     console.log(" message: ", message);
//   });

//   const stopInterview = () => {
//     console.log("INterview End");
//     vapi.stop();
//     stopTimer();
//   };

//   const handleOpenDialog = () => setOpenDialog(true);
//   const handleCloseDialog = () => setOpenDialog(false);

//   const handleConfirmStop = () => {
//     stopInterview(); // ✅ Call your stop function
//     handleCloseDialog();
//   };

//   const formatTime = (sec) => {
//     const minutes = Math.floor(sec / 60)
//       .toString()
//       .padStart(2, "0");
//     const seconds = (sec % 60).toString().padStart(2, "0");
//     return `${minutes}:${seconds}`;
//   };

//   const startTimer = () => {
//     clearInterval(timerRef.current); // prevent duplicate timers
//     setDuration(0); // reset time
//     timerRef.current = setInterval(() => {
//       setDuration((prev) => prev + 1);
//     }, 1000);
//   };

//   const stopTimer = () => {
//     clearInterval(timerRef.current);
//     timerRef.current = null;
//   };

//   const toggleMic = () => {
//     setIsMicOn((prev) => {
//       const newState = !prev;
//       vapiRef.current?.setMicrophoneEnabled(newState);
//       return newState;
//     });
//   };

//   useEffect(() => {
//     if (interviewData) {
//       startCall();
//     }
//   }, [interviewData]);

//   const [isCallActive, setIsCallActive] = useState(false);

//   const [speaking, setSpeaking] = useState(null);
//   const [answers, setAnswers] = useState([]);
//   const [countdown, setCountdown] = useState(3);
//   const [isLoading, setIsLoading] = useState(false);

//   // const vapiRef = useRef(null);

//   // const startInterviewCall = () => {
//   //   setIsLoading(true);
//   //   let countdownValue = 3;
//   //   const countdownInterval = setInterval(() => {
//   //     setCountdown(countdownValue);
//   //     countdownValue -= 1;

//   //     if (countdownValue < 0) {
//   //       clearInterval(countdownInterval);
//   //       beginVapiCall();
//   //     }
//   //   }, 1000);
//   // };

//   return (
//     <Box
//       className="bg-gray-100"
//       sx={{
//         minHeight: "100vh",
//         py: 4,
//         px: 2,
//         display: "flex",
//         flexDirection: "column",
//         alignItems: "center",
//       }}
//     >
//       <Box
//         width="100%"
//         maxWidth="1000px"
//         display="flex"
//         justifyContent="space-between"
//         mb={3}
//         px={isMobile ? 1 : 2}
//       >
//         <Typography variant="h6" fontWeight="600">
//           AI Interview Session
//         </Typography>
//         <Typography fontSize={18} fontWeight={"bold"}>
//           ⏱ {formatTime(duration)}
//         </Typography>
//       </Box>

//       {/* Interviewer & Candidate Boxes */}
//       <Box
//         display="flex"
//         flexWrap="wrap"
//         justifyContent="center"
//         gap={3}
//         width="100%"
//         maxWidth="1000px"
//         mb={4}
//       >
//         <Box
//           sx={{
//             flex: "1 1 300px",
//             maxWidth: 450,
//             minHeight: 400,
//             borderRadius: 3,
//             boxShadow: "0 0 15px rgba(0,0,0,0.1)",
//             backgroundColor: "white",
//             display: "flex",
//             flexDirection: "column",
//             alignItems: "center",
//             justifyContent: "center",
//             // border: speaking === "ai" ? "3px solid #60A5FA" : "none",
//           }}
//         >
//           <Box
//             sx={{
//               height: "90px",
//               width: "90px",
//               backgroundColor: "#6851ff",
//               display: "flex",
//               justifyContent: "center",
//               alignItems: "center",
//               borderRadius: "50%",
//               animation: !isActiveUser ? "pulse 1s infinite" : "none",
//             }}
//           >
//             <img
//               src="https://avatars.githubusercontent.com/u/140997677?v=4"
//               alt="AI Interviewer"
//               style={{ width: "80px", height: "80px", borderRadius: "50%" }}
//             />
//           </Box>
//           <Typography
//             variant="caption"
//             mt={2}
//             fontSize={18}
//             fontWeight={"bold"}
//           >
//             AI Interviewer
//           </Typography>
//         </Box>

//         <Box
//           sx={{
//             flex: "1 1 300px",
//             maxWidth: 450,
//             minHeight: 400,
//             borderRadius: 3,
//             boxShadow: "0 0 15px rgba(0,0,0,0.1)",
//             backgroundColor: "white",
//             display: "flex",
//             flexDirection: "column",
//             alignItems: "center",
//             justifyContent: "center",
//             // border: speaking === "user" ? "3px solid #34D399" : "none",
//           }}
//         >
//           <Box
//             sx={{
//               height: "90px",
//               width: "90px",
//               backgroundColor: "#6851ff",
//               display: "flex",
//               justifyContent: "center",
//               alignItems: "center",
//               borderRadius: "50%",
//               animation: isActiveUser ? "pulse 1s infinite" : "none",
//             }}
//           >
//             <Avatar
//               sx={{ width: 80, height: 80, fontSize: 36, bgcolor: "#1E293B" }}
//             >
//               {fullName?.charAt(0)?.toUpperCase() || "U"}
//             </Avatar>
//           </Box>
//           <Typography
//             variant="caption"
//             mt={2}
//             fontSize={18}
//             fontWeight={"bold"}
//           >
//             {fullName}
//           </Typography>
//         </Box>
//       </Box>

//       {/* Controls */}
//       <Box display="flex" gap={3} alignItems="center" flexWrap="wrap">
//         <IconButton
//           onClick={toggleMic}
//           sx={{
//             backgroundColor: isMicOn ? "#1E293B" : "#64748B",
//             color: "white",
//           }}
//           size="large"
//         >
//           {isMicOn ? <MicIcon /> : <MicOffIcon />}
//         </IconButton>

//         <IconButton
//           onClick={handleOpenDialog}
//           sx={{
//             backgroundColor: "#EF4444",
//             color: "white",
//             "&:hover": {
//               backgroundColor: "#7f1d1d", // Even darker on hover
//             },
//           }}
//           size="large"
//         >
//           <CallEndIcon />
//         </IconButton>

//         {/* Confirmation Dialog */}
//         <Dialog open={openDialog} onClose={handleCloseDialog}>
//           <DialogTitle>End Interview?</DialogTitle>
//           <DialogContent>
//             Are you sure you want to end this interview? This action cannot be
//             undone.
//           </DialogContent>
//           <DialogActions>
//             <Button onClick={handleCloseDialog}>Cancel</Button>
//             <Button
//               onClick={handleConfirmStop}
//               color="error"
//               variant="contained"
//             >
//               Yes, End
//             </Button>
//           </DialogActions>
//         </Dialog>

//         {/* Keyframes Animation */}
//         <style>
//           {`
//           @keyframes pulse {
//             0% {
//               transform: scale(1);
//               box-shadow: 0 0 0 0 rgba(104, 81, 255, 0.7);
//             }
//             70% {
//               transform: scale(1.1);
//               box-shadow: 0 0 20px 10px rgba(104, 81, 255, 0);
//             }
//             100% {
//               transform: scale(1);
//               box-shadow: 0 0 0 0 rgba(104, 81, 255, 0);
//             }
//           }
//         `}
//         </style>
//       </Box>

//       {/* Countdown/Status */}
//       {isLoading ? (
//         <Typography variant="h6" mt={3}>
//           Interview starts in {countdown}...
//         </Typography>
//       ) : (
//         <Typography variant="body2" mt={3} sx={{ color: "#94A3B8" }}>
//           {isCallActive
//             ? "Interview in progress..."
//             : "Click to start interview"}
//         </Typography>
//       )}
//     </Box>
//   );
// };

// export default InterviewSession;

import { BASE_URL } from "../../constants/baseUrl";
import React, { useEffect, useState, useRef } from "react";
import {
  Box,
  Typography,
  IconButton,
  Avatar,
  useMediaQuery,
  useTheme,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
} from "@mui/material";
import MicIcon from "@mui/icons-material/Mic";
import MicOffIcon from "@mui/icons-material/MicOff";
import CallEndIcon from "@mui/icons-material/CallEnd";
import Vapi from "@vapi-ai/web";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { setFeedbackData } from "../../redux/Slices/candidate";

const InterviewSession = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const [qaPairs, setQaPairs] = useState([]);
  const [isActiveUser, setIsActiveUser] = useState(false);
  const [openDialog, setOpenDialog] = useState(false);
  const [duration, setDuration] = useState(0);
  const [isMicOn, setIsMicOn] = useState(true);
  const [isCallActive, setIsCallActive] = useState(false);
  const timerRef = useRef(null);
  const vapiRef = useRef(null);
  const [feedback, setFeedback] = useState({});
  // console.log(feedback);
  const { interviewData, questions } = useSelector((state) => state?.interview);
  const { candidateName, candidateId } = useSelector(
    (state) => state?.candidate
  );
  const dispatch = useDispatch();

  const fullName = candidateName || "Candidate";
  const jobTitle = interviewData?.jobTitle || "Software Engineer";

  /** ✅ Initialize Vapi and listeners */
  useEffect(() => {
    vapiRef.current = new Vapi(import.meta.env.VITE_VAPI_PUBLIC_KEY);

    vapiRef.current.on("call-start", () => {
      console.log("✅ Call Started");
      setIsCallActive(true);
      startTimer();
    });

    vapiRef.current.on("call-end", () => {
      console.log("❌ Call Ended");
      setIsCallActive(false);
      stopTimer();
    });

    vapiRef.current.on("speech-start", () => setIsActiveUser(false));
    vapiRef.current.on("speech-end", () => setIsActiveUser(true));

    /** ✅ Handle conversation updates */
    vapiRef.current.on("message", (msg) => {
      if (
        msg.type === "conversation-update" &&
        Array.isArray(msg.conversation)
      ) {
        // console.log("Conversation msg:", msg);
        // console.log("Conversation Updated:", msg.conversation);

        // Build Q&A pairs
        const conv = msg.conversation;
        const pairs = [];
        for (let i = 0; i < conv.length; i++) {
          if (conv[i].role === "assistant") {
            const question = conv[i].content;
            const answer =
              i + 1 < conv.length && conv[i + 1].role === "user"
                ? conv[i + 1].content
                : "";
            pairs.push({ question, answer });
          }
        }
        setQaPairs(pairs);
        // console.log("Updated QA Pairs:", pairs);
      }
    });

    return () => {
      vapiRef.current?.stop();
      stopTimer();
    };
  }, []);

  /** ✅ Start the call */
  const startCall = () => {
    if (!vapiRef.current) return;

    const formattedQuestions = questions?.map((q) => `${q}`).join(", ");
    const assistantOptions = {
      name: "AI Recruiter",
      voice: { provider: "playht", voiceId: "Jennifer" },
      transcriber: { provider: "deepgram", model: "nova-2", language: "en-US" },
      firstMessage: `Hi ${fullName}! 👋 How are you doing today?`,
      model: {
        provider: "google",
        model: "gemini-1.5-pro",
        messages: [
          {
            role: "system",
            content: `
You are an AI recruiter conducting a voice-based interview.
Start with a friendly greeting.
Then say: "Welcome to your ${jobTitle} interview. Let's begin."

Ask questions one by one:
${formattedQuestions}

Wait for complete answers before moving on.
If the candidate hesitates, say: "It’s okay. Shall we move to the next question?"
End with: "Great job ${fullName}! Best of luck. Generating your interview summary now."
            `.trim(),
          },
        ],
      },
    };

    vapiRef.current.start(assistantOptions);
  };

  /** ✅ Stop interview & submit answers */
  const stopInterview = async () => {
    try {
      if (vapiRef.current) vapiRef.current.stop();
      stopTimer();
      setIsCallActive(false);

      // console.log("Final QA pairs:", qaPairs);
      // qaPairs
      if (qaPairs.length > 0) {
        await axios.put(`${BASE_URL}/candidate/submit/${candidateId}`, {
          answers: [{ question: qaPairs?.question, answer: qaPairs?.answer }],
        });
        console.log("✅ Answers saved successfully");
      } else {
        console.warn("⚠ No answers to save");
      }

      // generate feedback
      const generateFeedback = await axios.post(
        `${BASE_URL}/candidate/feedback/${candidateId}`
      );
      console.log("✅ Feedback generated", generateFeedback?.data?.feedback);
      setFeedback(generateFeedback?.data?.feedback);
      dispatch(setFeedbackData(generateFeedback?.data?.feedback));
    } catch (err) {
      console.error("Error saving answers or generating feedback:", err);
    }
  };

  /** ✅ Dialog handlers */
  const handleOpenDialog = () => setOpenDialog(true);
  const handleCloseDialog = () => setOpenDialog(false);
  const handleConfirmStop = () => {
    stopInterview();
    handleCloseDialog();
  };

  /** ✅ Timer */
  const startTimer = () => {
    clearInterval(timerRef.current);
    setDuration(0);
    timerRef.current = setInterval(() => {
      setDuration((prev) => prev + 1);
    }, 1000);
  };

  const stopTimer = () => {
    clearInterval(timerRef.current);
    timerRef.current = null;
  };

  const formatTime = (sec) => {
    const minutes = Math.floor(sec / 60)
      .toString()
      .padStart(2, "0");
    const seconds = (sec % 60).toString().padStart(2, "0");
    return `${minutes}:${seconds}`;
  };

  // /** ✅ Toggle Mic */
  // const toggleMic = () => {
  //   if (!vapiRef.current) return;
  //   setIsMicOn((prev) => {
  //     const newState = !prev;
  //     vapiRef.current.setMicrophoneEnabled(newState);
  //     return newState;
  //   });
  // };

  const toggleMic = () => {
    if (!vapiRef.current) return;
    setIsMicOn((prev) => {
      const newState = !prev;

      if (typeof vapiRef.current.updateMicrophone === "function") {
        vapiRef.current.updateMicrophone({ enabled: newState });
      } else if (
        vapiRef.current.call &&
        typeof vapiRef.current.call.update === "function"
      ) {
        vapiRef.current.call.update({ microphone: newState });
      } else {
        console.warn("Microphone toggle not supported in current Vapi version");
      }

      return newState;
    });
  };

  /** ✅ Auto-start call when data ready */
  useEffect(() => {
    if (interviewData && questions?.length) {
      startCall();
    }
  }, [interviewData]);

  return (
    <Box
      className="bg-gray-100"
      sx={{
        minHeight: "100vh",
        py: 4,
        px: 2,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <Box
        width="100%"
        maxWidth="1000px"
        display="flex"
        justifyContent="space-between"
        mb={3}
        px={isMobile ? 1 : 2}
      >
        <Typography variant="h6" fontWeight="600">
          AI Interview Session
        </Typography>
        <Typography fontSize={18} fontWeight={"bold"}>
          ⏱ {formatTime(duration)}
        </Typography>
      </Box>

      {/* Interviewer & Candidate */}
      <Box
        display="flex"
        flexWrap="wrap"
        justifyContent="center"
        gap={3}
        width="100%"
        maxWidth="1000px"
        mb={4}
      >
        {/* AI */}
        <Box
          sx={{
            flex: "1 1 300px",
            maxWidth: 450,
            minHeight: 400,
            borderRadius: 3,
            boxShadow: "0 0 15px rgba(0,0,0,0.1)",
            backgroundColor: "white",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Box
            sx={{
              height: "90px",
              width: "90px",
              backgroundColor: "#6851ff",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              borderRadius: "50%",
              animation: !isActiveUser ? "pulse 1s infinite" : "none",
            }}
          >
            <img
              src="https://avatars.githubusercontent.com/u/140997677?v=4"
              alt="AI Interviewer"
              style={{ width: "80px", height: "80px", borderRadius: "50%" }}
            />
          </Box>
          <Typography
            variant="caption"
            mt={2}
            fontSize={18}
            fontWeight={"bold"}
          >
            AI Interviewer
          </Typography>
        </Box>

        {/* Candidate */}
        <Box
          sx={{
            flex: "1 1 300px",
            maxWidth: 450,
            minHeight: 400,
            borderRadius: 3,
            boxShadow: "0 0 15px rgba(0,0,0,0.1)",
            backgroundColor: "white",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Box
            sx={{
              height: "90px",
              width: "90px",
              backgroundColor: "#6851ff",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              borderRadius: "50%",
              animation: isActiveUser ? "pulse 1s infinite" : "none",
            }}
          >
            <Avatar
              sx={{ width: 80, height: 80, fontSize: 36, bgcolor: "#1E293B" }}
            >
              {fullName?.charAt(0)?.toUpperCase() || "U"}
            </Avatar>
          </Box>
          <Typography
            variant="caption"
            mt={2}
            fontSize={18}
            fontWeight={"bold"}
          >
            {fullName}
          </Typography>
        </Box>
      </Box>

      {/* Controls */}
      <Box display="flex" gap={3} alignItems="center" flexWrap="wrap">
        <IconButton
          onClick={toggleMic}
          sx={{
            backgroundColor: isMicOn ? "#1E293B" : "#64748B",
            color: "white",
          }}
          size="large"
        >
          {isMicOn ? <MicIcon /> : <MicOffIcon />}
        </IconButton>

        <IconButton
          onClick={handleOpenDialog}
          sx={{
            backgroundColor: "#EF4444",
            color: "white",
            "&:hover": { backgroundColor: "#7f1d1d" },
          }}
          size="large"
        >
          <CallEndIcon />
        </IconButton>

        <Dialog open={openDialog} onClose={handleCloseDialog}>
          <DialogTitle>End Interview?</DialogTitle>
          <DialogContent>
            Are you sure you want to end this interview? This action cannot be
            undone.
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCloseDialog}>Cancel</Button>
            <Button
              onClick={handleConfirmStop}
              color="error"
              variant="contained"
            >
              Yes, End
            </Button>
          </DialogActions>
        </Dialog>

        <style>
          {`
            @keyframes pulse {
              0% { transform: scale(1); box-shadow: 0 0 0 0 rgba(104, 81, 255, 0.7); }
              70% { transform: scale(1.1); box-shadow: 0 0 20px 10px rgba(104, 81, 255, 0); }
              100% { transform: scale(1); box-shadow: 0 0 0 0 rgba(104, 81, 255, 0); }
            }
          `}
        </style>
      </Box>

      <Typography variant="body2" mt={3} sx={{ color: "#94A3B8" }}>
        {isCallActive ? "Interview in progress..." : "Click to start interview"}
      </Typography>
    </Box>
  );
};

export default InterviewSession;
