import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  Paper,
  TextField,
  Typography,
  Divider,
  Snackbar,
  Alert,
} from "@mui/material";
import {
  Videocam,
  AccessTime,
  PlayCircleFilledWhite,
  BusinessCenter,
} from "@mui/icons-material";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import { BASE_URL } from "../../constants/baseUrl";
import SubHeader from "../../components/Header/SubHeader";
import { useSelector, useDispatch } from "react-redux";
import {
  setCandidate,
  setInterviewData,
  setQuestions,
} from "../../redux/Slices/interviewSlice";
import { setCandidateName } from "../../redux/Slices/candidate";

const JoinInterview = () => {
  // const { questions, currentQuestionIndex } = useSelector(
  //   (state) => state.interview
  // );
  // console.log("Questions : ", questions);
  // console.log("currentQuestionIndex : ", currentQuestionIndex);
  const dispatch = useDispatch();
  const { joinCode } = useParams();
  const navigate = useNavigate();

  const [data, setData] = useState([]);
  const [fullName, setFullName] = useState("");
  const [loading, setLoading] = useState(false);
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "success",
  });

  const fetchInterviewDetails = async () => {
    try {
      const apiRes = await axios.get(`${BASE_URL}/interview/join/${joinCode}`);
      // console.log(apiRes?.data?.data)
      setData(apiRes?.data?.data);
      // dispatch(setCandidate(apiRes?.data?.data?.candidate)); // interviewSlice
      dispatch(setQuestions(apiRes?.data?.data?.questions));
      dispatch(setInterviewData(apiRes?.data?.data));
      
      // dispatch(setCandidateJobTitle(apiRes?.data?.data?.candidate.jobTitle));
      // dispatch(setCandidate(apiRes?.data?.data?.candidate));
    } catch (err) {
      console.error("Failed to fetch interview data:", err);
    }
  };

  const handleSnackbarClose = () => {
    setSnackbar({ ...snackbar, open: false });
  };

  const JoinInterviewHandle = async () => {
    if (!fullName) {
      setSnackbar({
        open: true,
        message: "Please enter your full name.",
        severity: "warning",
      });
      return;
    }

    setLoading(true);
    const payload = {
      joinCode,
      fullName,
    };

    try {
      const apiRes = await axios.post(`${BASE_URL}/candidate/`, payload);
      //  dispatch(setCandidateName(apiRes?.data?));
      // console.log("API Response:",apiRes?.data?.fullName)
      dispatch(setCandidateName(apiRes?.data?.fullName)); // candidateSlice
      setSnackbar({
        open: true,
        message: apiRes?.data?.message || "Joined successfully!",
        severity: "success",
      });

      setTimeout(() => {
        navigate("/interview-session");
      }, 2000);
    } catch (error) {
      setSnackbar({
        open: true,
        message:
          error?.response?.data?.message || "Something went wrong. Try again.",
        severity: "error",
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (joinCode) {
      fetchInterviewDetails();
    }
  }, [joinCode]);

  return (
    <>
      <SubHeader />

      <Box className="min-h-screen flex items-center justify-center bg-[#f9fafb] px-4">
        <Paper
          elevation={4}
          className="w-full max-w-3xl p-10 rounded-3xl flex flex-col items-center shadow-xl ring-1 ring-gray-200"
        >
          {/* Logo + Illustration + Job Info Landscape Style */}
          <Box className="w-full flex flex-col md:flex-row items-center justify-between gap-10 md:gap-16 mb-10 px-4 md:px-8">
            {/* Left: Illustration */}
            <Box className="w-full md:w-1/2 flex justify-center">
              <Box className="bg-white p-3 rounded-2xl shadow-md">
                <img
                  src="https://res.cloudinary.com/dpvxkqhi8/image/upload/v1752565586/ai-login_j3kjuq.webp"
                  alt="Interview Illustration"
                  className="max-h-64 object-contain"
                />
              </Box>
            </Box>

            {/* Right: Info Section */}
            <Box className="w-full md:w-1/2 space-y-4 text-center md:text-left">
              <Typography
                variant="h4"
                fontWeight="bold"
                className="text-indigo-600 tracking-tight"
              >
                AI Recruiter
              </Typography>
              <Typography variant="body2" className="text-gray-500">
                Your AI-Powered Interview Platform
              </Typography>

              <Divider className="!my-2 !border-gray-200" />

              <Typography
                variant="h6"
                fontWeight="bold"
                className="text-gray-800 leading-tight"
              >
                {data?.jobTitle} Interview
              </Typography>

              <Box className="flex flex-wrap justify-center md:justify-start items-center gap-4 text-sm text-gray-600">
                <Box className="flex items-center gap-1">
                  <BusinessCenter fontSize="small" />
                  <span>Google Inc.</span>
                </Box>
                <Divider
                  orientation="vertical"
                  flexItem
                  className="hidden md:block"
                />
                <Box className="flex items-center gap-1">
                  <AccessTime fontSize="small" />
                  <span>{data?.interviewDuration}</span>
                </Box>
              </Box>
            </Box>
          </Box>

          {/* Input */}
          <TextField
            label="Enter your full name"
            placeholder="e.g., John Smith"
            variant="outlined"
            fullWidth
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            sx={{ marginBottom: "20px" }}
          />

          {/* Tips Box */}
          <Box className="w-full bg-indigo-50 p-4 rounded-xl border border-indigo-200 mb-6">
            <Typography
              variant="subtitle1"
              fontWeight="bold"
              className="mb-2 text-indigo-700"
            >
              Before you begin
            </Typography>
            <ul className="list-disc list-inside text-sm text-gray-700 space-y-1">
              <li>Ensure you have a stable internet connection</li>
              <li>Test your camera and microphone</li>
              <li>Find a quiet place for the interview</li>
            </ul>
          </Box>

          {/* Buttons */}
          <Box className=" flex flex-col sm:flex-row gap-3">
            <Button
              variant="contained"
              fullWidth
              size="large"
              startIcon={<Videocam />}
              sx={{
                backgroundColor: "#6851ff",
                textTransform: "none",
                fontWeight: 600,
                borderRadius: 2,
                "&:hover": { backgroundColor: "#6811ff" },
              }}
              onClick={JoinInterviewHandle}
              disabled={loading}
            >
              {loading ? "Joining..." : "Join Interview"}
            </Button>

            {/* <Button
              variant="outlined"
              fullWidth
              startIcon={<PlayCircleFilledWhite />}
              sx={{
                textTransform: "none",
                fontWeight: 500,
                borderRadius: 2,
                // color: "#3b82f6",
                color: "#3b82f6",
                borderColor: "#3b82f6",
                "&:hover": { borderColor: "#2563eb", color: "#2563eb" },
              }}
            >
              Test Audio & Video
            </Button> */}
          </Box>
        </Paper>
      </Box>

      {/* Snackbar */}
      <Snackbar
        open={snackbar.open}
        autoHideDuration={3000}
        onClose={handleSnackbarClose}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
      >
        <Alert
          onClose={handleSnackbarClose}
          severity={snackbar.severity}
          sx={{ width: "100%" }}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </>
  );
};

export default JoinInterview;