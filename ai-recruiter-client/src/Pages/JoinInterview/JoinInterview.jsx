import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  Paper,
  TextField,
  Typography,
  Divider,
  Avatar,
} from "@mui/material";
import {
  Videocam,
  AccessTime,
  PlayCircleFilledWhite,
} from "@mui/icons-material";
import axios from "axios";
import { Link, useParams } from "react-router-dom";
import { BASE_URL, BASE_URL_PROD } from "../../constants/baseUrl";

const JoinInterview = () => {
  const { joinCode } = useParams();
  // console.log(joinCode)
  const [interviewData, setInterviewData] = useState([]);

  const fetchInterviewDetails = async (req, res) => {
   try {
      const apiRes = await axios.get(`${BASE_URL}/interview/join/${joinCode}`);
      console.log(apiRes?.data?.data)
      setInterviewData(apiRes?.data?.data);
    } catch (err) {
      console.error("Failed to fetch interview data:", err);
    }
  };
  
  useEffect(() => {
    if (joinCode) {
      fetchInterviewDetails();
    }
  }, [joinCode]);
  return (
    <Box className="min-h-screen flex items-center justify-center bg-[#f9fafb] ">
      <Paper
        elevation={3}
        className="w-full max-w-md p-6 rounded-3xl flex flex-col items-center"
      >
        {/* Logo & Heading */}
        <Typography
          variant="h5"
          fontWeight="bold"
          className="text-primary mb-2"
        >
          Mine AI Recruiter
        </Typography>
        <Typography variant="body2" color="textSecondary" gutterBottom>
          AI-Powered Interview Platform
        </Typography>

        {/* Illustration */}
        <img
          src="https://res.cloudinary.com/dpvxkqhi8/image/upload/v1752565586/ai-login_j3kjuq.webp"
          alt="Interview Illustration"
          className="max-h-48 object-contain my-4"
        />

        {/* Job Info */}
        <Typography variant="h6" fontWeight="bold" className="mb-1">
          {`${interviewData?.jobTitle} Interview`}
        </Typography>
        <Box className="flex items-center gap-2 mb-4 text-sm text-gray-500">
          <Typography variant="body2">Google Inc.</Typography>
          <Divider orientation="vertical" flexItem />
          <Box className="flex items-center gap-1">
            <AccessTime fontSize="small" />
            <Typography variant="body2">{`${interviewData?.interviewDuration}`}</Typography>
          </Box>
        </Box>

        {/* Input Field */}
        <TextField
          sx={{
            marginBottom: "10px",
          }}
          label="Enter your full name"
          placeholder="e.g., John Smith"
          variant="outlined"
          fullWidth
        />

        {/* Before You Begin Box */}
        <Box className="w-full bg-[#eef2ff] p-3 rounded-lg border border-blue-200 mb-5">
          <Typography variant="subtitle2" fontWeight="bold" className="mb-2">
            Before you begin
          </Typography>
          <ul className="list-disc list-inside text-sm text-gray-700 space-y-1">
            <li>Ensure you have a stable internet connection</li>
            <li>Test your camera and microphone</li>
            <li>Find a quiet place for the interview</li>
          </ul>
        </Box>

        {/* Buttons */}

        <Link to={"/interview-session"}>
        <Button
          variant="contained"
          fullWidth
          size="large"
          startIcon={<Videocam />}
          sx={{
            backgroundColor: "#3b82f6",
            textTransform: "none",
            fontWeight: 600,
            borderRadius: 2,
            mb: 1.5,
            "&:hover": {
              backgroundColor: "#2563eb",
            },
          }}
        >
          Join Interview
        </Button>
</Link>
        <Button
          variant="outlined"
          fullWidth
          startIcon={<PlayCircleFilledWhite />}
          sx={{ textTransform: "none", fontWeight: 500, borderRadius: 2 }}
        >
          Test Audio & Video
        </Button>
      </Paper>
    </Box>
  );
};

export default JoinInterview;
