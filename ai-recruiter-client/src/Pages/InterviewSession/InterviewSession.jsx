// import React, { useEffect, useState } from "react";
// import {
//   Box,
//   Typography,
//   IconButton,
//   useMediaQuery,
//   useTheme,
// } from "@mui/material";
// import MicIcon from "@mui/icons-material/Mic";
// import CallEndIcon from "@mui/icons-material/CallEnd";
// import Vapi from "@vapi-ai/web";
// import { useSelector } from "react-redux";

// const InterviewSession = ({}) => {
//   // const { questions } = useSelector((state) => state.interview);
//   const theme = useTheme();
//   const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

//   const { interviewData, questions } = useSelector((state) => state.interview);
//   const { candidateName } = useSelector((state) => state.candidate);

//   const fullName = candidateName;
//   const jobTitle = interviewData?.jobTitle;

//   // console.log(candidateName);
//   // console.log("Interview dAta:", interviewData);

//   useEffect(() => {
//     if (questions?.length > 0 && candidateName && jobTitle) {
//       const formattedQuestions = questions
//         .map((q, i) => `${i + 1}. ${q}`)
//         .join("\n");

//       const assistantOptions = {
//         name: "AI Recruiter",
//         firstMessage: `Hi ${fullName}, how are you? Ready for your interview on ${jobTitle}?`,
//         voice: {
//           provider: "playht",
//           voiceId: "Jennifer",
//         },
//         transcriber: {
//           provider: "deepgram",
//           model: "nova-2",
//           language: "en-US",
//         },
//         model: {
//           provider: "google",
//           model: "gemini-1.5-pro",
//           messages: [
//             {
//               role: "system",
//               content: `
// You are an AI voice assistant conducting interviews.
// Your job is to ask candidates provided interview questions, assess their responses.

// Begin with a friendly tone:
// "Hey ${candidateName}! Welcome to your ${jobTitle} interview. Let’s get started with a few questions!"

// Ask one question at a time and wait for their answer. Keep it casual and encouraging.

// Questions:
// ${formattedQuestions}

// If the candidate struggles, offer hints like:
// "Need a hint? Think about how React tracks component updates!"

// Give short feedback:
// "Nice!", "Good one!", or "Hmm, not quite. Want to try again?"

// Wrap up with:
// "Awesome job, ${candidateName}! You handled those ${jobTitle} questions really well. Best of luck!"
// `.trim(),
//             },
//           ],
//         },
//       };

//       const vapi = new Vapi(import.meta.env.VITE_VAPI_PUBLIC_KEY);
//       vapi.start(assistantOptions);
//     }
//   }, [questions, candidateName, jobTitle]);

//   //   useEffect(() => {
//   //     if (questions?.length > 0) {
//   //       const formattedQuestions = questions
//   //         .map((q, i) => `${i + 1}. ${q}`)
//   //         .join("\n");
//   //       if (!formattedQuestions || formattedQuestions.length === 0) return;

//   //       const assistantOptions = {
//   //         name: "AI Recruiter",
//   //         firstMessage: `Hi ${fullName}, how are you? Ready for your interview on ${jobTitle}?`,
//   //         voice: {
//   //           provider: "playht",
//   //           voiceId: "Jennifer",
//   //         },

//   //         transcriber: {
//   //           provider: "deepgram",
//   //           model: "nova-2",
//   //           language: "en-US",
//   //         },
//   //         model: {
//   //           provider: "google",
//   //           // model: "gemini-1.5-pro",
//   //             model: "gemini-1.5-pro", // ✅ fixed model name
//   //           messages: [
//   //             {
//   //               role: "system",
//   //               content: `
//   // You are an AI voice assistant conducting interviews.
//   // Your job is to ask candidates provided interview questions, assess their responses.

//   // Begin with a friendly tone:
//   // "Hey ${fullName}! Welcome to your ${jobTitle} interview. Let’s get started with a few questions!"

//   // Ask one question at a time and wait for their answer. Keep it casual and encouraging.

//   // Questions:
//   // ${formattedQuestions}

//   // If the candidate struggles, offer hints like:
//   // "Need a hint? Think about how React tracks component updates!"

//   // Give short feedback:
//   // "Nice!", "Good one!", or "Hmm, not quite. Want to try again?"

//   // Wrap up with:
//   // "Awesome job, ${fullName}! You handled those ${jobTitle} questions really well. Best of luck!"
//   //               `.trim(),
//   //             },
//   //           ],
//   //         },
//   //       };

//   //       // const vapi = new Vapi(import.meta.env.VITE_VAPI_PUBLIC_KEY);
//   //       // vapi.start(assistantOptions);
//   //     }
//   //   }, [questions, fullName, jobTitle]);

//   return (
//     <Box
//       sx={{
//         minHeight: "100vh",
//         py: 4,
//         px: 2,
//         color: "black",
//         display: "flex",
//         flexDirection: "column",
//         alignItems: "center",
//       }}
//       className="bg-gray-100"
//     >
//       {/* Header */}
//       <Box
//         width="100%"
//         maxWidth="1000px"
//         display="flex"
//         justifyContent="space-between"
//         alignItems="center"
//         mb={3}
//         px={isMobile ? 1 : 2}
//       >
//         <Typography variant="h6" fontWeight="600">
//           AI Interview Session
//         </Typography>
//         <Typography fontSize={14}>⏱ 00:05:23</Typography>
//       </Box>

//       {/* Interviewer & Candidate */}
//       <Box
//         display="flex"
//         flexWrap="wrap"
//         justifyContent="center"
//         gap={3}
//         width="100%"
//         maxWidth="1000px"
//         mb={4}
//       >
//         {/* AI Interviewer */}
//         <Box
//           sx={{
//             flex: "1 1 300px",
//             maxWidth: 450,
//             minHeight: 400,
//             borderRadius: 3,
//             overflow: "hidden",
//             boxShadow: "rgba(0, 0, 0, 0.24) 0px 3px 8px",
//             backgroundColor: "white",
//             display: "flex",
//             flexDirection: "column",
//             alignItems: "center",
//             justifyContent: "center",
//           }}
//         >
//           <img
//             src="https://avatars.githubusercontent.com/u/140997677?v=4"
//             alt="AI Interviewer"
//             style={{
//               width: "100px",
//               height: "100px",
//               borderRadius: "50%",
//               objectFit: "cover",
//             }}
//           />
//           <Typography
//             variant="caption"
//             sx={{
//               position: "absolute",
//               bottom: 8,
//               left: 8,
//               backgroundColor: "rgba(0,0,0,0.6)",
//               padding: "2px 6px",
//               borderRadius: 2,
//               fontSize: "0.75rem",
//               color: "white",
//             }}
//           >
//             AI Interviewer
//           </Typography>
//         </Box>

//         {/* You */}
//         <Box
//           sx={{
//             flex: "1 1 300px",
//             maxWidth: 450,
//             minHeight: 400,
//             borderRadius: 3,
//             overflow: "hidden",
//             boxShadow: "rgba(0, 0, 0, 0.24) 0px 3px 8px",
//             backgroundColor: "white",
//             display: "flex",
//             flexDirection: "column",
//             alignItems: "center",
//             justifyContent: "center",
//           }}
//         >
//           <img
//             src="https://randomuser.me/api/portraits/men/32.jpg"
//             alt="You"
//             style={{
//               width: "100px",
//               height: "100px",
//               borderRadius: "50%",
//               objectFit: "cover",
//             }}
//           />
//           <Typography
//             variant="caption"
//             sx={{
//               position: "absolute",
//               bottom: 8,
//               left: 8,
//               backgroundColor: "rgba(0,0,0,0.6)",
//               padding: "2px 6px",
//               borderRadius: 2,
//               fontSize: "0.75rem",
//               color: "white",
//             }}
//           >
//             You
//           </Typography>
//         </Box>
//       </Box>

//       {/* Controls */}
//       <Box display="flex" gap={3} alignItems="center" flexWrap="wrap">
//         <IconButton
//           sx={{
//             backgroundColor: "#1E293B",
//             color: "white",
//             "&:hover": { backgroundColor: "#334155" },
//           }}
//           size="large"
//         >
//           <MicIcon />
//         </IconButton>
//         <IconButton
//           sx={{
//             backgroundColor: "#EF4444",
//             color: "white",
//             "&:hover": { backgroundColor: "#DC2626" },
//           }}
//           size="large"
//         >
//           <CallEndIcon />
//         </IconButton>
//       </Box>

//       {/* Footer */}
//       <Typography
//         variant="body2"
//         mt={3}
//         sx={{ color: "#94A3B8", fontSize: "0.9rem" }}
//       >
//         Interview in progress...
//       </Typography>
//     </Box>
//   );
// };

// export default InterviewSession;

// import React, { useEffect, useState, useRef } from "react";
// import {
//   Box,
//   Typography,
//   IconButton,
//   Avatar,
//   useMediaQuery,
//   useTheme,
// } from "@mui/material";
// import MicIcon from "@mui/icons-material/Mic";
// import MicOffIcon from "@mui/icons-material/MicOff";
// import CallEndIcon from "@mui/icons-material/CallEnd";
// import CallIcon from "@mui/icons-material/Call";
// import Vapi from "@vapi-ai/web";
// import { useSelector } from "react-redux";

// const InterviewSession = () => {
//   const theme = useTheme();
//   const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

//   const { interviewData, questions } = useSelector((state) => state.interview);
//   const {candidateName} = useSelector((state) => state?.candidate);

//   // console.log(fullName)
//   const fullName = candidateName || "Candidate";
//   const jobTitle = interviewData?.jobTitle || "Software Engineer";
//   // console.log(fullName)

//   const [isMicOn, setIsMicOn] = useState(true);
//   const [isCallActive, setIsCallActive] = useState(false);
//   const [duration, setDuration] = useState(0); // in seconds
//   const [speaking, setSpeaking] = useState(null); // "ai" | "user"

//   const timerRef = useRef(null);
//   const vapiRef = useRef(null);

//   // Format seconds as MM:SS
//   const formatTime = (sec) => {
//     const minutes = Math.floor(sec / 60)
//       .toString()
//       .padStart(2, "0");
//     const seconds = (sec % 60).toString().padStart(2, "0");
//     return `${minutes}:${seconds}`;
//   };

//   // Start timer
//   const startTimer = () => {
//     timerRef.current = setInterval(() => {
//       setDuration((prev) => prev + 1);
//     }, 1000);
//   };

//   // Stop timer
//   const stopTimer = () => {
//     clearInterval(timerRef.current);
//   };

//   const startInterviewCall = () => {
//     const formattedQuestions = questions
//       ?.map((q, i) => `${i + 1}. ${q}`)
//       .join("\n");

//     const assistantOptions = {
//       name: "AI Recruiter",
//       firstMessage: `Hi ${fullName}, how are you? Ready for your interview on ${jobTitle}?`,
//       voice: {
//         provider: "playht",
//         voiceId: "Jennifer",
//       },
//       transcriber: {
//         provider: "deepgram",
//         model: "nova-2",
//         language: "en-US",
//       },
//       model: {
//         provider: "google",
//         model: "gemini-1.5-pro",
//         messages: [
//           {
//             role: "system",
//             content: `
// You are an AI voice assistant conducting interviews.
// Your job is to ask candidates provided interview questions, assess their responses.

// Start with:
// "Hey ${fullName}! Welcome to your ${jobTitle} interview. Let’s begin!"

// Questions:
// ${formattedQuestions}

// Wait for answers after each. Give short feedback:
// "Nice!", "Hmm, try again?", or "That’s correct!"

// Wrap up:
// "Awesome job, ${fullName}! You handled those ${jobTitle} questions really well. Best of luck!"
//           `.trim(),
//           },
//         ],
//       },
//     };

//     const vapi = new Vapi(import.meta.env.VITE_VAPI_PUBLIC_KEY);
//     vapiRef.current = vapi;

//     vapi.on("speech-start", (data) => {
//       setSpeaking(data.speaker === "user" ? "user" : "ai");
//     });

//     vapi.on("speech-end", () => {
//       setSpeaking(null);
//     });

//     vapi.start(assistantOptions);
//     setIsCallActive(true);
//     startTimer();
//   };

//   const stopInterviewCall = () => {
//     vapiRef.current?.stop();
//     setIsCallActive(false);
//     stopTimer();
//   };

//   const toggleMic = () => {
//     setIsMicOn((prev) => {
//       const newState = !prev;
//       if (vapiRef.current) {
//         vapiRef.current.setMicrophoneEnabled(newState);
//       }
//       return newState;
//     });
//   };

//   return (
//     <Box
//       sx={{
//         minHeight: "100vh",
//         py: 4,
//         px: 2,
//         display: "flex",
//         flexDirection: "column",
//         alignItems: "center",
//       }}
//       className="bg-gray-100"
//     >
//       {/* Header */}
//       <Box
//         width="100%"
//         maxWidth="1000px"
//         display="flex"
//         justifyContent="space-between"
//         alignItems="center"
//         mb={3}
//         px={isMobile ? 1 : 2}
//       >
//         <Typography variant="h6" fontWeight="600">
//           AI Interview Session
//         </Typography>
//         <Typography fontSize={14}>⏱ {formatTime(duration)}</Typography>
//       </Box>

//       {/* Interviewer & Candidate */}
//       <Box
//         display="flex"
//         flexWrap="wrap"
//         justifyContent="center"
//         gap={3}
//         width="100%"
//         maxWidth="1000px"
//         mb={4}
//       >
//         {/* AI Interviewer */}
//         <Box
//           sx={{
//             flex: "1 1 300px",
//             maxWidth: 450,
//             minHeight: 400,
//             borderRadius: 3,
//             overflow: "hidden",
//             boxShadow: "0 0 15px rgba(0,0,0,0.1)",
//             backgroundColor: "white",
//             display: "flex",
//             flexDirection: "column",
//             alignItems: "center",
//             justifyContent: "center",
//             border: speaking === "ai" ? "3px solid #60A5FA" : "none",
//           }}
//         >
//           <img
//             src="https://avatars.githubusercontent.com/u/140997677?v=4"
//             alt="AI Interviewer"
//             style={{
//               width: "100px",
//               height: "100px",
//               borderRadius: "50%",
//               objectFit: "cover",
//             }}
//           />
//           <Typography variant="caption" mt={2}>
//             AI Interviewer
//           </Typography>
//         </Box>

//         {/* Candidate */}
//         <Box
//           sx={{
//             flex: "1 1 300px",
//             maxWidth: 450,
//             minHeight: 400,
//             borderRadius: 3,
//             overflow: "hidden",
//             boxShadow: "0 0 15px rgba(0,0,0,0.1)",
//             backgroundColor: "white",
//             display: "flex",
//             flexDirection: "column",
//             alignItems: "center",
//             justifyContent: "center",
//             border: speaking === "user" ? "3px solid #34D399" : "none",
//           }}
//         >
//           <Avatar
//             sx={{
//               width: 100,
//               height: 100,
//               fontSize: 36,
//               bgcolor: "#1E293B",
//             }}
//           >
//             {fullName?.charAt(0)?.toUpperCase() || "U"}
//           </Avatar>
//           <Typography variant="caption" mt={2}>
//             You
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
//             "&:hover": { backgroundColor: "#334155" },
//           }}
//           size="large"
//         >
//           {isMicOn ? <MicIcon /> : <MicOffIcon />}
//         </IconButton>

//         {isCallActive ? (
//           <IconButton
//             onClick={stopInterviewCall}
//             sx={{
//               backgroundColor: "#EF4444",
//               color: "white",
//               "&:hover": { backgroundColor: "#DC2626" },
//             }}
//             size="large"
//           >
//             <CallEndIcon />
//           </IconButton>
//         ) : (
//           <IconButton
//             onClick={startInterviewCall}
//             sx={{
//               backgroundColor: "#10B981",
//               color: "white",
//               "&:hover": { backgroundColor: "#059669" },
//             }}
//             size="large"
//           >
//             <CallIcon />
//           </IconButton>
//         )}
//       </Box>

//       <Typography variant="body2" mt={3} sx={{ color: "#94A3B8", fontSize: "0.9rem" }}>
//         {isCallActive ? "Interview in progress..." : "Click to start interview"}
//       </Typography>
//     </Box>
//   );
// };

// export default InterviewSession;












// import React, { useEffect, useState, useRef } from "react";
// import {
//   Box,
//   Typography,
//   IconButton,
//   Avatar,
//   useMediaQuery,
//   useTheme,
// } from "@mui/material";
// import MicIcon from "@mui/icons-material/Mic";
// import MicOffIcon from "@mui/icons-material/MicOff";
// import CallEndIcon from "@mui/icons-material/CallEnd";
// import CallIcon from "@mui/icons-material/Call";
// import Vapi from "@vapi-ai/web";
// import { useSelector } from "react-redux";

// const InterviewSession = () => {
//   const theme = useTheme();
//   const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

//   const { interviewData, questions } = useSelector((state) => state.interview);
//   const { candidateName, candidateId } = useSelector((state) => state?.candidate);

//   const fullName = candidateName || "Candidate";
//   const jobTitle = interviewData?.jobTitle || "Software Engineer";

//   const [isMicOn, setIsMicOn] = useState(true);
//   const [isCallActive, setIsCallActive] = useState(false);
//   const [duration, setDuration] = useState(0);
//   const [speaking, setSpeaking] = useState(null);
//   const [answers, setAnswers] = useState([]);

//   const timerRef = useRef(null);
//   const vapiRef = useRef(null);

//   const formatTime = (sec) => {
//     const minutes = Math.floor(sec / 60).toString().padStart(2, "0");
//     const seconds = (sec % 60).toString().padStart(2, "0");
//     return `${minutes}:${seconds}`;
//   };

//   const startTimer = () => {
//     timerRef.current = setInterval(() => {
//       setDuration((prev) => prev + 1);
//     }, 1000);
//   };

//   const stopTimer = () => {
//     clearInterval(timerRef.current);
//   };

//   const startInterviewCall = () => {
//     const formattedQuestions = questions?.map((q, i) => `${i + 1}. ${q}`).join("\n");

//     const assistantOptions = {
//       name: "AI Recruiter",
//       firstMessage: `Hi ${fullName}, how are you? Ready for your interview on ${jobTitle}?`,
//       voice: { provider: "playht", voiceId: "Jennifer" },
//       transcriber: { provider: "deepgram", model: "nova-2", language: "en-US" },
//       model: {
//         provider: "google",
//         model: "gemini-1.5-pro",
//         messages: [
//           {
//             role: "system",
//             content: `
// You are an AI voice assistant conducting interviews.
// Ask candidate the questions and wait for response.

// Begin:
// "Hey ${fullName}, welcome to your ${jobTitle} interview."

// Questions:
// ${formattedQuestions}

// Give short feedback after each answer like:
// "Great!", "Try again?", or "Hmm, interesting..."

// End with:
// "Great work ${fullName}, best of luck!"
//           `.trim(),
//           },
//         ],
//       },
//     };

//     const vapi = new Vapi(import.meta.env.VITE_VAPI_PUBLIC_KEY);
//     vapiRef.current = vapi;

//     vapi.on("speech-start", (data) => {
//       setSpeaking(data.speaker === "user" ? "user" : "ai");
//     });

//     vapi.on("speech-end", () => {
//       setSpeaking(null);
//     });

//     vapi.on("transcript", (data) => {
//       console.log(data)
//       if (data.speaker === "user" && data.transcript) {
//         const answerText = data.transcript;
//         setAnswers((prev) => [
//           ...prev,
//           { question: questions[prev.length], answer: answerText },
//         ]);
//       }
//     });

//     vapi.start(assistantOptions);
//     setIsCallActive(true);
//     startTimer();
//   };

//   const stopInterviewCall = async () => {
//     vapiRef.current?.stop();
//     setIsCallActive(false);
//     stopTimer();

//     try {
//       const response = await fetch(
//         `${import.meta.env.VITE_API_BASE_URL}/api/candidate/submit/${candidateId}`,
//         {
//           method: "PATCH",
//           headers: { "Content-Type": "application/json" },
//           body: JSON.stringify({ answers }),
//         }
//       );

//       const data = await response.json();
//       console.log("✅ Submitted to backend:", data);
//     } catch (error) {
//       console.error("❌ Error submitting answers:", error);
//     }
//   };

//   const toggleMic = () => {
//     setIsMicOn((prev) => {
//       const newState = !prev;
//       vapiRef.current?.setMicrophoneEnabled(newState);
//       return newState;
//     });
//   };

//   return (
//     <Box className="bg-gray-100" sx={{ minHeight: "100vh", py: 4, px: 2, display: "flex", flexDirection: "column", alignItems: "center" }}>
//       <Box width="100%" maxWidth="1000px" display="flex" justifyContent="space-between" mb={3} px={isMobile ? 1 : 2}>
//         <Typography variant="h6" fontWeight="600">AI Interview Session</Typography>
//         <Typography fontSize={14}>⏱ {formatTime(duration)}</Typography>
//       </Box>

//       {/* Interviewer & Candidate Boxes */}
//       <Box display="flex" flexWrap="wrap" justifyContent="center" gap={3} width="100%" maxWidth="1000px" mb={4}>
//         <Box sx={{ flex: "1 1 300px", maxWidth: 450, minHeight: 400, borderRadius: 3, boxShadow: "0 0 15px rgba(0,0,0,0.1)", backgroundColor: "white", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", border: speaking === "ai" ? "3px solid #60A5FA" : "none" }}>
//           <img src="https://avatars.githubusercontent.com/u/140997677?v=4" alt="AI Interviewer" style={{ width: "100px", height: "100px", borderRadius: "50%" }} />
//           <Typography variant="caption" mt={2}>AI Interviewer</Typography>
//         </Box>

//         <Box sx={{ flex: "1 1 300px", maxWidth: 450, minHeight: 400, borderRadius: 3, boxShadow: "0 0 15px rgba(0,0,0,0.1)", backgroundColor: "white", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", border: speaking === "user" ? "3px solid #34D399" : "none" }}>
//           <Avatar sx={{ width: 100, height: 100, fontSize: 36, bgcolor: "#1E293B" }}>{fullName?.charAt(0)?.toUpperCase() || "U"}</Avatar>
//           <Typography variant="caption" mt={2}>You</Typography>
//         </Box>
//       </Box>

//       {/* Controls */}
//       <Box display="flex" gap={3} alignItems="center" flexWrap="wrap">
//         <IconButton onClick={toggleMic} sx={{ backgroundColor: isMicOn ? "#1E293B" : "#64748B", color: "white" }} size="large">
//           {isMicOn ? <MicIcon /> : <MicOffIcon />}
//         </IconButton>

//         {isCallActive ? (
//           <IconButton onClick={stopInterviewCall} sx={{ backgroundColor: "#EF4444", color: "white" }} size="large">
//             <CallEndIcon />
//           </IconButton>
//         ) : (
//           <IconButton onClick={startInterviewCall} sx={{ backgroundColor: "#10B981", color: "white" }} size="large">
//             <CallIcon />
//           </IconButton>
//         )}
//       </Box>

//       <Typography variant="body2" mt={3} sx={{ color: "#94A3B8" }}>
//         {isCallActive ? "Interview in progress..." : "Click to start interview"}
//       </Typography>
//     </Box>
//   );
// };

// export default InterviewSession;























// ✅ same imports
import React, { useEffect, useState, useRef } from "react";
import axios from 'axios';
import {
  Box,
  Typography,
  IconButton,
  Avatar,
  useMediaQuery,
  useTheme,
  CircularProgress,
} from "@mui/material";
import MicIcon from "@mui/icons-material/Mic";
import MicOffIcon from "@mui/icons-material/MicOff";
import CallEndIcon from "@mui/icons-material/CallEnd";
import CallIcon from "@mui/icons-material/Call";
import Vapi from "@vapi-ai/web";
import { useSelector } from "react-redux";
import { BASE_URL, BASE_URL_PROD } from "../../constants/baseUrl";

const InterviewSession = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const { interviewData, questions } = useSelector((state) => state.interview);
  const { candidateName, candidateId } = useSelector(
    (state) => state?.candidate
  );

  // console.log(candidateId)
  const fullName = candidateName || "Candidate";
  const jobTitle = interviewData?.jobTitle || "Software Engineer";

  const [isMicOn, setIsMicOn] = useState(true);
  const [isCallActive, setIsCallActive] = useState(false);
  const [duration, setDuration] = useState(0);
  const [speaking, setSpeaking] = useState(null);
  const [answers, setAnswers] = useState([]);
  const [countdown, setCountdown] = useState(3);
  const [isLoading, setIsLoading] = useState(false);

  const timerRef = useRef(null);
  const vapiRef = useRef(null);

  const formatTime = (sec) => {
    const minutes = Math.floor(sec / 60)
      .toString()
      .padStart(2, "0");
    const seconds = (sec % 60).toString().padStart(2, "0");
    return `${minutes}:${seconds}`;
  };

  const startTimer = () => {
    timerRef.current = setInterval(() => {
      setDuration((prev) => prev + 1);
    }, 1000);
  };

  const stopTimer = () => {
    clearInterval(timerRef.current);
  };

  const startInterviewCall = () => {
    setIsLoading(true);
    let countdownValue = 3;
    const countdownInterval = setInterval(() => {
      setCountdown(countdownValue);
      countdownValue -= 1;

      if (countdownValue < 0) {
        clearInterval(countdownInterval);
        beginVapiCall();
      }
    }, 1000);
  };

  const beginVapiCall = () => {
    const formattedQuestions = questions
      ?.map((q, i) => `${i + 1}. ${q}`)
      .join("\n");

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
You are a smart and friendly AI recruiter conducting a voice-based interview.

Start by greeting the candidate and waiting for their response:
"Hi there! 👋 How are you doing today?"

Once they respond, say:
"Welcome to your ${jobTitle} interview. Let's get started."

Ask one question at a time from this list:
${formattedQuestions}

Wait for their full response before moving on.

If they hesitate or sound stuck, gently say:
"It’s totally okay. Shall we move to the next question?"

End the interview with:
"Great work ${fullName}! Best of luck. I’m generating your interview summary now."
`.trim(),
          },
        ],
      },
    };

    const vapi = new Vapi(import.meta.env.VITE_VAPI_PUBLIC_KEY);
    vapiRef.current = vapi;

    vapi.on("speech-start", (data) => {
      setSpeaking(data.speaker === "user" ? "user" : "ai");
    });

    vapi.on("speech-end", () => {
      setSpeaking(null);
    });

    vapi.on("transcript", (data) => {
      if (data.speaker === "user" && data.transcript) {
        const answerText = data.transcript;
        setAnswers((prev) => [
          ...prev,
          { question: questions[prev.length], answer: answerText },
        ]);
      }
    });

    vapi.start(assistantOptions);
    setIsCallActive(true);
    setIsLoading(false);
    startTimer();
  };

  const stopInterviewCall = async () => {
    vapiRef.current?.stop();
    setIsCallActive(false);
    stopTimer();

    try {
      const apiRes = await axios.put(`${BASE_URL}/candidate/submit/${candidateId}`,{
        answers: answers, // ✅ pass the answers in request body
      },);

      console.log("✅ Submitted to backend:", apiRes);
    } catch (error) {
      console.error("❌ Error submitting answers:", error);
    }
  };

  const toggleMic = () => {
    setIsMicOn((prev) => {
      const newState = !prev;
      vapiRef.current?.setMicrophoneEnabled(newState);
      return newState;
    });
  };

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
        <Typography fontSize={14}>⏱ {formatTime(duration)}</Typography>
      </Box>

      {/* Interviewer & Candidate Boxes */}
      <Box
        display="flex"
        flexWrap="wrap"
        justifyContent="center"
        gap={3}
        width="100%"
        maxWidth="1000px"
        mb={4}
      >
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
            border: speaking === "ai" ? "3px solid #60A5FA" : "none",
          }}
        >
          <img
            src="https://avatars.githubusercontent.com/u/140997677?v=4"
            alt="AI Interviewer"
            style={{ width: "100px", height: "100px", borderRadius: "50%" }}
          />
          <Typography variant="caption" mt={2}>
            AI Interviewer
          </Typography>
        </Box>

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
            border: speaking === "user" ? "3px solid #34D399" : "none",
          }}
        >
          <Avatar
            sx={{ width: 100, height: 100, fontSize: 36, bgcolor: "#1E293B" }}
          >
            {fullName?.charAt(0)?.toUpperCase() || "U"}
          </Avatar>
          <Typography variant="caption" mt={2}>
            You
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

        {isCallActive ? (
          <IconButton
            onClick={stopInterviewCall}
            sx={{ backgroundColor: "#EF4444", color: "white" }}
            size="large"
          >
            <CallEndIcon />
          </IconButton>
        ) : (
          <IconButton
            onClick={startInterviewCall}
            sx={{ backgroundColor: "#10B981", color: "white" }}
            size="large"
          >
            <CallIcon />
          </IconButton>
        )}
      </Box>

      {/* Countdown/Status */}
      {isLoading ? (
        <Typography variant="h6" mt={3}>
          Interview starts in {countdown}...
        </Typography>
      ) : (
        <Typography variant="body2" mt={3} sx={{ color: "#94A3B8" }}>
          {isCallActive
            ? "Interview in progress..."
            : "Click to start interview"}
        </Typography>
      )}
    </Box>
  );
};

export default InterviewSession;