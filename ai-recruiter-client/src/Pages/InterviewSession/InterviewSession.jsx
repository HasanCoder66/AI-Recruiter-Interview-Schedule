// import { BASE_URL } from "../../constants/baseUrl";
// import React, { useEffect, useState, useRef } from "react";
// import {
//   Box,
//   Typography,
//   IconButton,
//   Avatar,
//   useMediaQuery,
//   useTheme,
//   Dialog,
//   DialogTitle,
//   DialogContent,
//   DialogActions,
//   Button,
//   Snackbar,
//   Alert,
// } from "@mui/material";
// import MicIcon from "@mui/icons-material/Mic";
// import MicOffIcon from "@mui/icons-material/MicOff";
// import CallEndIcon from "@mui/icons-material/CallEnd";
// import Vapi from "@vapi-ai/web";
// import { useDispatch, useSelector } from "react-redux";
// import axios from "axios";
// import { setFeedbackData } from "../../redux/Slices/candidate";
// import { useNavigate } from "react-router-dom";

// const InterviewSession = () => {
//   const theme = useTheme();
//   const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
//   const [qaPairs, setQaPairs] = useState([]);
//   const [isActiveUser, setIsActiveUser] = useState(false);
//   const [openDialog, setOpenDialog] = useState(false);
//   const [duration, setDuration] = useState(0);
//   const [isMicOn, setIsMicOn] = useState(true);
//   const [isCallActive, setIsCallActive] = useState(false);
//   const [feedback, setFeedback] = useState({});
//   const [openSnackbar, setOpenSnackbar] = useState(false);
//   const [snackbarMsg, setSnackbarMsg] = useState("");

//   const timerRef = useRef(null);
//   const vapiRef = useRef(null);
//   const navigate = useNavigate();
//   const dispatch = useDispatch();

//   const { interviewData, questions } = useSelector((state) => state?.interview);
//   const { candidateName, candidateId } = useSelector(
//     (state) => state?.candidate
//   );

//   const fullName = candidateName || "Candidate";
//   const jobTitle = interviewData?.jobTitle || "Software Engineer";

//   const MAX_DURATION = 900; // 15 minutes

//   /** ✅ Initialize Vapi and listeners */
//   useEffect(() => {
//     vapiRef.current = new Vapi(import.meta.env.VITE_VAPI_PUBLIC_KEY);

//     vapiRef.current.on("call-start", () => {
//       setIsCallActive(true);
//       startTimer();
//     });

//     vapiRef.current.on("call-end", () => {
//       setIsCallActive(false);
//       stopTimer();
//     });

//     vapiRef.current.on("speech-start", () => setIsActiveUser(false));
//     vapiRef.current.on("speech-end", () => setIsActiveUser(true));

//     vapiRef.current.on("message", (msg) => {
//       if (
//         msg.type === "conversation-update" &&
//         Array.isArray(msg.conversation)
//       ) {
//         const conv = msg.conversation;
//         const pairs = [];
//         for (let i = 0; i < conv.length; i++) {
//           if (conv[i].role === "assistant") {
//             const question = conv[i].content;
//             const answer =
//               i + 1 < conv.length && conv[i + 1].role === "user"
//                 ? conv[i + 1].content
//                 : "";
//             pairs.push({ question, answer });
//           }
//         }
//         setQaPairs(pairs);
//       }
//     });

//     return () => {
//       vapiRef.current?.stop();
//       stopTimer();
//     };
//   }, []);

//   /** ✅ Start call */
//   const startCall = () => {
//     if (!vapiRef.current) return;
//     const formattedQuestions = questions?.map((q) => `${q}`).join(", ");
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
// You are an AI recruiter conducting a voice-based interview.
// Start with a friendly greeting.
// Then say: "Welcome to your ${jobTitle} interview. Let's begin."

// Ask questions one by one:
// ${formattedQuestions}

// Wait for complete answers before moving on.
// If the candidate hesitates, say: "It’s okay. Shall we move to the next question?"
// If the candidate gives a strong or impressive answer, respond with a positive phrase like:
// "Nice start!", "Great!", "Well done!", "Excellent!", "Good job!"
// Then proceed to the next question naturally.
// End with: "Great job ${fullName}! Best of luck. Generating your interview summary now."
//             `.trim(),
//           },
//         ],
//       },
//     };
//     vapiRef.current.start(assistantOptions);
//   };

//   /** ✅ Stop interview & submit answers */
//   const stopInterview = async (auto = false) => {
//     try {
//       if (vapiRef.current) vapiRef.current.stop();
//       stopTimer();
//       setIsCallActive(false);

//       if (qaPairs.length > 0) {
//         await axios.put(`${BASE_URL}/candidate/submit/${candidateId}`, {
//           answers: qaPairs,
//         });
//       }

//       const generateFeedback = await axios.post(
//         `${BASE_URL}/candidate/feedback/${candidateId}`
//       );
//       setFeedback(generateFeedback?.data?.feedback);
//       dispatch(setFeedbackData(generateFeedback?.data?.feedback));

//       // ✅ Snackbar + Redirect
//       setSnackbarMsg(
//         auto ? "Interview ended (time limit reached)" : "Interview ended"
//       );
//       setOpenSnackbar(true);
//       setTimeout(() => {
//         navigate(`/candidate-report/${candidateId}`);
//       }, 2000);
//     } catch (err) {
//       console.error("Error saving answers or generating feedback:", err);
//     }
//   };

//   /** ✅ Dialog handlers */
//   const handleOpenDialog = () => setOpenDialog(true);
//   const handleCloseDialog = () => setOpenDialog(false);
//   const handleConfirmStop = () => {
//     stopInterview(false);
//     handleCloseDialog();
//   };

//   /** ✅ Timer */
//   const startTimer = () => {
//     clearInterval(timerRef.current);
//     setDuration(0);
//     timerRef.current = setInterval(() => {
//       setDuration((prev) => prev + 1);
//     }, 1000);
//   };
//   const stopTimer = () => clearInterval(timerRef.current);
//   const formatTime = (sec) =>
//     `${String(Math.floor(sec / 60)).padStart(2, "0")}:${String(
//       sec % 60
//     ).padStart(2, "0")}`;

//   /** ✅ Auto-stop on time limit */
//   useEffect(() => {
//     if (duration >= MAX_DURATION && isCallActive) stopInterview(true);
//   }, [duration, isCallActive]);

//   /** ✅ Toggle Mic */
//   const toggleMic = () => {
//     if (!vapiRef.current) return;
//     setIsMicOn((prev) => {
//       const newState = !prev;
//       if (typeof vapiRef.current.updateMicrophone === "function") {
//         vapiRef.current.updateMicrophone({ enabled: newState });
//       } else if (
//         vapiRef.current.call &&
//         typeof vapiRef.current.call.update === "function"
//       ) {
//         vapiRef.current.call.update({ microphone: newState });
//       }
//       return newState;
//     });
//   };

//   /** ✅ Auto-start when data ready */
//   useEffect(() => {
//     if (interviewData && questions?.length) startCall();
//   }, [interviewData]);

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
//         <Typography fontSize={18} fontWeight="bold">
//           ⏱ {formatTime(duration)}
//         </Typography>
//       </Box>

//       {/* Participants */}
//       <Box
//         display="flex"
//         flexWrap="wrap"
//         justifyContent="center"
//         gap={3}
//         width="100%"
//         maxWidth="1000px"
//         mb={4}
//       >
//         {/* AI */}
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
//           }}
//         >
//           <Box
//             sx={{
//               height: 90,
//               width: 90,
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
//               style={{ width: 80, height: 80, borderRadius: "50%" }}
//             />
//           </Box>
//           <Typography variant="caption" mt={2} fontSize={18} fontWeight="bold">
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
//             boxShadow: "0 0 15px rgba(0,0,0,0.1)",
//             backgroundColor: "white",
//             display: "flex",
//             flexDirection: "column",
//             alignItems: "center",
//             justifyContent: "center",
//           }}
//         >
//           <Box
//             sx={{
//               height: 90,
//               width: 90,
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
//           <Typography variant="caption" mt={2} fontSize={18} fontWeight="bold">
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
//             "&:hover": { backgroundColor: "#7f1d1d" },
//           }}
//           size="large"
//         >
//           <CallEndIcon />
//         </IconButton>

//         {/* Confirm Dialog */}
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
//       </Box>

//       <Typography variant="body2" mt={3} sx={{ color: "#94A3B8" }}>
//         {isCallActive ? "Interview in progress..." : "Click to start interview"}
//       </Typography>

//       {/* Snackbar */}
//       <Snackbar
//         open={openSnackbar}
//         autoHideDuration={2000}
//         onClose={() => setOpenSnackbar(false)}
//         anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
//       >
//         <Alert severity="info" sx={{ width: "100%" }}>
//           {snackbarMsg}
//         </Alert>
//       </Snackbar>

//       <style>{`
//         @keyframes pulse {
//           0% { transform: scale(1); box-shadow: 0 0 0 0 rgba(104, 81, 255, 0.7); }
//           70% { transform: scale(1.1); box-shadow: 0 0 20px 10px rgba(104, 81, 255, 0); }
//           100% { transform: scale(1); box-shadow: 0 0 0 0 rgba(104, 81, 255, 0); }
//         }
//       `}</style>
//     </Box>
//   );
// };

// export default InterviewSession;

// import { BASE_URL } from "../../constants/baseUrl";
// import React, { useEffect, useState, useRef } from "react";
// import {
//   Box,
//   Typography,
//   IconButton,
//   Avatar,
//   useMediaQuery,
//   useTheme,
//   Dialog,
//   DialogTitle,
//   DialogContent,
//   DialogActions,
//   Button,
//   Snackbar,
//   Alert,
// } from "@mui/material";
// import MicIcon from "@mui/icons-material/Mic";
// import MicOffIcon from "@mui/icons-material/MicOff";
// import CallEndIcon from "@mui/icons-material/CallEnd";
// import Vapi from "@vapi-ai/web";
// import { useDispatch, useSelector } from "react-redux";
// import axios from "axios";
// import { setFeedbackData } from "../../redux/Slices/candidate";
// import { useNavigate } from "react-router-dom";

// const InterviewSession = () => {
//   const theme = useTheme();
//   const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
//   const [qaPairs, setQaPairs] = useState([]);
//   const [isActiveUser, setIsActiveUser] = useState(false);
//   const [openDialog, setOpenDialog] = useState(false);
//   const [duration, setDuration] = useState(0);
//   const [isMicOn, setIsMicOn] = useState(true);
//   const [isCallActive, setIsCallActive] = useState(false);
//   const [feedback, setFeedback] = useState({});
//   const [openSnackbar, setOpenSnackbar] = useState(false);
//   const [snackbarMsg, setSnackbarMsg] = useState("");
//   const [isStopping, setIsStopping] = useState(false);

//   const timerRef = useRef(null);
//   const vapiRef = useRef(null);
//   const navigate = useNavigate();
//   const dispatch = useDispatch();

//   const { interviewData, questions } = useSelector((state) => state?.interview);
//   const { candidateName, candidateId } = useSelector(
//     (state) => state?.candidate
//   );

//   const fullName = candidateName || "Candidate";
//   const jobTitle = interviewData?.jobTitle || "Software Engineer";

//   // const MAX_DURATION = 60; // 1 minutes
//   // const MAX_DURATION = 900; // 15 minutes
//   const MAX_DURATION = 600; // 10 minutes

//   /** ✅ Initialize Vapi and listeners */
//   useEffect(() => {
//     vapiRef.current = new Vapi(import.meta.env.VITE_VAPI_PUBLIC_KEY);

//     vapiRef.current.on("call-start", () => {
//       setIsCallActive(true);
//       startTimer();
//     });

//     vapiRef.current.on("call-end", () => {
//       setIsCallActive(false);
//       stopTimer();
//     });

//     vapiRef.current.on("speech-start", () => setIsActiveUser(false));
//     vapiRef.current.on("speech-end", () => setIsActiveUser(true));

//     vapiRef.current.on("message", (msg) => {
//       if (
//         msg.type === "conversation-update" &&
//         Array.isArray(msg.conversation)
//       ) {
//         const conv = msg.conversation;
//         const pairs = [];
//         for (let i = 0; i < conv.length; i++) {
//           if (conv[i].role === "assistant") {
//             const question = conv[i].content;
//             const answer =
//               i + 1 < conv.length && conv[i + 1].role === "user"
//                 ? conv[i + 1].content
//                 : "";
//             pairs.push({ question, answer });
//           }
//         }
//         setQaPairs(pairs);
//       }
//     });

//     return () => {
//       vapiRef.current?.stop();
//       stopTimer();
//     };
//   }, []);

//   /** ✅ Start call */
//   const startCall = () => {
//     if (!vapiRef.current) return;
//     const formattedQuestions = questions?.map((q) => `${q}`).join(", ");
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
// You are an AI recruiter conducting a voice-based interview.
// Start with a friendly greeting.
// Then say: "Welcome to your ${jobTitle} interview. Let's begin."

// Ask questions one by one:
// ${formattedQuestions}

// Wait for complete answers before moving on.
// If the candidate hesitates, say: "It’s okay. Shall we move to the next question?"
// If the candidate gives a strong or impressive answer, respond with a positive phrase like:
// "Nice start!", "Great!", "Well done!", "Excellent!", "Good job!"
// Then proceed to the next question naturally.
// End with: "Great job ${fullName}! Best of luck. Generating your interview summary now."
//             `.trim(),
//           },
//         ],
//       },
//     };
//     vapiRef.current.start(assistantOptions);
//   };

//   /** ✅ Stop interview & submit answers */
//   const stopInterview = async (auto = false) => {
//     if (isStopping) return; // prevent duplicate execution
//     setIsStopping(true);

//     try {
//       if (vapiRef.current) vapiRef.current.stop();
//       stopTimer();
//       setIsCallActive(false);

//       if (qaPairs.length > 0) {
//         await axios.put(`${BASE_URL}/candidate/submit/${candidateId}`, {
//           answers: qaPairs,
//         });
//       }

//       const generateFeedback = await axios.post(
//         `${BASE_URL}/candidate/feedback/${candidateId}`
//       );
//       setFeedback(generateFeedback?.data?.feedback);
//       dispatch(setFeedbackData(generateFeedback?.data?.feedback));

//       setSnackbarMsg(
//         auto ? "Interview ended (time limit reached)" : "Interview ended"
//       );
//       setOpenSnackbar(true);

//       setTimeout(() => {
//         navigate(`/candidate-report/${candidateId}`);
//       }, 2000);
//     } catch (err) {
//       console.error("Error saving answers or generating feedback:", err);
//     } finally {
//       setIsStopping(false);
//     }
//   };

//   /** ✅ Dialog handlers */
//   const handleOpenDialog = () => setOpenDialog(true);
//   const handleCloseDialog = () => setOpenDialog(false);
//   const handleConfirmStop = () => {
//     stopInterview(false);
//     handleCloseDialog();
//   };

//   /** ✅ Timer */
//   const startTimer = () => {
//     clearInterval(timerRef.current);
//     setDuration(0);
//     timerRef.current = setInterval(() => {
//       setDuration((prev) => prev + 1);
//     }, 1000);
//   };
//   const stopTimer = () => clearInterval(timerRef.current);
//   const formatTime = (sec) =>
//     `${String(Math.floor(sec / 60)).padStart(2, "0")}:${String(
//       sec % 60
//     ).padStart(2, "0")}`;

//   /** ✅ Auto-stop on time limit */
//   useEffect(() => {
//     if (duration >= MAX_DURATION && isCallActive) stopInterview(true);
//   }, [duration, isCallActive]);

//   /** ✅ Toggle Mic */
//   const toggleMic = () => {
//     if (!vapiRef.current) return;
//     setIsMicOn((prev) => {
//       const newState = !prev;
//       if (typeof vapiRef.current.updateMicrophone === "function") {
//         vapiRef.current.updateMicrophone({ enabled: newState });
//       } else if (
//         vapiRef.current.call &&
//         typeof vapiRef.current.call.update === "function"
//       ) {
//         vapiRef.current.call.update({ microphone: newState });
//       }
//       return newState;
//     });
//   };

//   /** ✅ Auto-start when data ready */
//   useEffect(() => {
//     if (interviewData && questions?.length) startCall();
//   }, [interviewData]);

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
//         <Typography fontSize={18} fontWeight="bold">
//           ⏱ {formatTime(duration)}
//         </Typography>
//       </Box>

//       {/* Participants */}
//       <Box
//         display="flex"
//         flexWrap="wrap"
//         justifyContent="center"
//         gap={3}
//         width="100%"
//         maxWidth="1000px"
//         mb={4}
//       >
//         {/* AI */}
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
//           }}
//         >
//           <Box
//             sx={{
//               height: 90,
//               width: 90,
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
//               style={{ width: 80, height: 80, borderRadius: "50%" }}
//             />
//           </Box>
//           <Typography variant="caption" mt={2} fontSize={18} fontWeight="bold">
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
//             boxShadow: "0 0 15px rgba(0,0,0,0.1)",
//             backgroundColor: "white",
//             display: "flex",
//             flexDirection: "column",
//             alignItems: "center",
//             justifyContent: "center",
//           }}
//         >
//           <Box
//             sx={{
//               height: 90,
//               width: 90,
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
//           <Typography variant="caption" mt={2} fontSize={18} fontWeight="bold">
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
//             "&:hover": { backgroundColor: "#7f1d1d" },
//           }}
//           size="large"
//         >
//           <CallEndIcon />
//         </IconButton>

//         {/* Confirm Dialog */}
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
//       </Box>

//       <Typography variant="body2" mt={3} sx={{ color: "#94A3B8" }}>
//         {isCallActive ? "Interview in progress..." : "Click to start interview"}
//       </Typography>

//       {/* Snackbar */}
//       <Snackbar
//         open={openSnackbar}
//         autoHideDuration={2000}
//         onClose={() => setOpenSnackbar(false)}
//         anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
//       >
//         <Alert severity="info" sx={{ width: "100%" }}>
//           {snackbarMsg}
//         </Alert>
//       </Snackbar>

//       <style>{`
//         @keyframes pulse {
//           0% { transform: scale(1); box-shadow: 0 0 0 0 rgba(104, 81, 255, 0.7); }
//           70% { transform: scale(1.1); box-shadow: 0 0 20px 10px rgba(104, 81, 255, 0); }
//           100% { transform: scale(1); box-shadow: 0 0 0 0 rgba(104, 81, 255, 0); }
//         }
//       `}</style>
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
import { useNavigate } from "react-router-dom";

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
  const navigate = useNavigate();

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
        //         messages: [
        //           {
        //             role: "system",
        //             content: `
        // You are an AI recruiter conducting a voice-based interview.
        // Start with a friendly greeting.
        // Then say: "Welcome to your ${jobTitle} interview. Let's begin."

        // Ask questions one by one:
        // ${formattedQuestions}

        // Wait for complete answers before moving on.
        // If the candidate hesitates, say: "It’s okay. Shall we move to the next question?"
        // End with: "Great job ${fullName}! Best of luck. Generating your interview summary now."
        //             `.trim(),
        //           },
        //         ],
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
If the candidate gives a strong or impressive answer, respond with a positive phrase like:
"Nice start!", "Great!", "Well done!", "Excellent!", "Good job!"
Then proceed to the next question naturally.
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

      // console.log("✅ Feedback generated", generateFeedback?.data?.feedback);
      setFeedback(generateFeedback?.data?.feedback);
      setTimeout(() => {
        navigate(`/candidate-report/${candidateId}`);
      }, 1500);
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
