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
  BusinessCenter,
} from "@mui/icons-material";
import axios from "axios";
import { Link, useParams } from "react-router-dom";
import { BASE_URL, BASE_URL_PROD } from "../../constants/baseUrl";
import SubHeader from "../../components/Header/SubHeader";

const JoinInterview = () => {
  const { joinCode } = useParams();
  // console.log(joinCode)
  const [interviewData, setInterviewData] = useState([]);

  const fetchInterviewDetails = async (req, res) => {
    try {
      const apiRes = await axios.get(`${BASE_URL}/interview/join/${joinCode}`);
      console.log(apiRes?.data?.data);
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
    //     <Box className="min-h-screen flex items-center justify-center bg-[#f9fafb] ">
    //       <Paper
    //         elevation={3}
    //         className="w-full max-w-md p-6 rounded-3xl flex flex-col items-center"
    //       >
    //         {/* Logo & Heading */}
    //         <Typography
    //           variant="h5"
    //           fontWeight="bold"
    //           className="text-primary mb-2"
    //         >
    //           Mine AI Recruiter
    //         </Typography>
    //         <Typography variant="body2" color="textSecondary" gutterBottom>
    //           AI-Powered Interview Platform
    //         </Typography>

    //         {/* Illustration */}
    //         <img
    //           src="https://res.cloudinary.com/dpvxkqhi8/image/upload/v1752565586/ai-login_j3kjuq.webp"
    //           alt="Interview Illustration"
    //           className="max-h-48 object-contain my-4"
    //         />

    //         {/* Job Info */}
    //         <Typography variant="h6" fontWeight="bold" className="mb-1">
    //           {`${interviewData?.jobTitle} Interview`}
    //         </Typography>
    //         <Box className="flex items-center gap-2 mb-4 text-sm text-gray-500">
    //           <Typography variant="body2">Google Inc.</Typography>
    //           <Divider orientation="vertical" flexItem />
    //           <Box className="flex items-center gap-1">
    //             <AccessTime fontSize="small" />
    //             <Typography variant="body2">{`${interviewData?.interviewDuration}`}</Typography>
    //           </Box>
    //         </Box>

    //         {/* Input Field */}
    //         <TextField
    //           sx={{
    //             marginBottom: "10px",
    //           }}
    //           label="Enter your full name"
    //           placeholder="e.g., John Smith"
    //           variant="outlined"
    //           fullWidth
    //         />

    //         {/* Before You Begin Box */}
    //         <Box className="w-full bg-[#eef2ff] p-3 rounded-lg border border-blue-200 mb-5">
    //           <Typography variant="subtitle2" fontWeight="bold" className="mb-2">
    //             Before you begin
    //           </Typography>
    //           <ul className="list-disc list-inside text-sm text-gray-700 space-y-1">
    //             <li>Ensure you have a stable internet connection</li>
    //             <li>Test your camera and microphone</li>
    //             <li>Find a quiet place for the interview</li>
    //           </ul>
    //         </Box>

    //         {/* Buttons */}

    //         <Link to={"/interview-session"}>
    //         <Button
    //           variant="contained"
    //           fullWidth
    //           size="large"
    //           startIcon={<Videocam />}
    //           sx={{
    //             backgroundColor: "#3b82f6",
    //             textTransform: "none",
    //             fontWeight: 600,
    //             borderRadius: 2,
    //             mb: 1.5,
    //             "&:hover": {
    //               backgroundColor: "#2563eb",
    //             },
    //           }}
    //         >
    //           Join Interview
    //         </Button>
    // </Link>
    //         <Button
    //           variant="outlined"
    //           fullWidth
    //           startIcon={<PlayCircleFilledWhite />}
    //           sx={{ textTransform: "none", fontWeight: 500, borderRadius: 2 }}
    //         >
    //           Test Audio & Video
    //         </Button>
    //       </Paper>
    //     </Box>
    <>
      <SubHeader />

      <Box className="min-h-screen flex items-center justify-center bg-[#f9fafb] px-4">
        <Paper
          elevation={4}
          className="w-full max-w-2xl p-10 rounded-3xl flex flex-col items-center shadow-xl ring-1 ring-gray-200"
        >
          {/* Logo & Heading */}
          {/* <Typography variant="h4" fontWeight="bold" className="text-indigo-600 mb-2">
      Mine AI Recruiter
    </Typography>
    <Typography variant="body2" color="textSecondary" gutterBottom>
      Your AI-Powered Interview Platform
    </Typography> */}

          {/* Illustration */}
          {/* <img
      src="https://res.cloudinary.com/dpvxkqhi8/image/upload/v1752565586/ai-login_j3kjuq.webp"
      alt="Interview Illustration"
      className="max-h-52 object-contain my-5"
    /> */}

          {/* Job Info */}
          {/* <Typography variant="h6" fontWeight="bold" className="mb-1 text-gray-800">
      {`${interviewData?.jobTitle} Interview`}
    </Typography>
    <Box className="flex items-center gap-3 mb-5 text-sm text-gray-500">
      <Typography variant="body2">Google Inc.</Typography>
      <Divider orientation="vertical" flexItem />
      <Box className="flex items-center gap-1">
        <AccessTime fontSize="small" />
        <Typography variant="body2">{interviewData?.interviewDuration}</Typography>
      </Box>
    </Box> */}

          {/* Logo, Illustration, Job Info — Enhanced Landscape Style */}
          <Box className="w-full flex flex-col md:flex-row items-center justify-between gap-10 md:gap-16 mb-10 px-4 md:px-8">
            {/* Left: Illustration with subtle shadow */}
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
              {/* Branding */}
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

              {/* Divider */}
              <Divider className="!my-2 !border-gray-200" />

              {/* Job Info */}
              <Typography
                variant="h6"
                fontWeight="bold"
                className="text-gray-800 leading-tight"
              >
                {interviewData?.jobTitle} Interview
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
                  <span>{interviewData?.interviewDuration}</span>
                </Box>
              </Box>
            </Box>
          </Box>

          {/* Name Input */}
          <TextField
            label="Enter your full name"
            placeholder="e.g., John Smith"
            variant="outlined"
            fullWidth
            sx={{ marginBottom: "20px" }}
          />

          {/* Before You Begin */}
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
          <Box className="w-full flex flex-col sm:flex-row gap-3">
            <Link to="/interview-session" className="w-full">
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
                  "&:hover": { backgroundColor: "#2563eb" },
                }}
              >
                Join Interview
              </Button>
            </Link>

            <Button
              variant="outlined"
              fullWidth
              startIcon={<PlayCircleFilledWhite />}
              sx={{
                textTransform: "none",
                fontWeight: 500,
                borderRadius: 2,
                color: "#3b82f6",
                borderColor: "#3b82f6",
                "&:hover": { borderColor: "#2563eb", color: "#2563eb" },
              }}
            >
              Test Audio & Video
            </Button>
          </Box>
        </Paper>
      </Box>
    </>
  );
};

export default JoinInterview;
