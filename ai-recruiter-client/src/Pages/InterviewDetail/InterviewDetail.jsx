import axios from "axios";
import React, { useEffect, useState } from "react";
import {
  Box,
  Typography,
  Chip,
  Divider,
  Avatar,
  Button,
  IconButton,
} from "@mui/material";
import {
  AccessTime,
  CalendarToday,
  Label,
  FilterList,
  FileDownload,
} from "@mui/icons-material";
import { Link, useParams } from "react-router-dom";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { BASE_URL_PROD } from "../../constants/baseUrl";

const InterviewDetails = () => {
  const { id } = useParams();
  const [interviewDetail, setInterviewDetail] = useState(null);
  console.log(interviewDetail);
  const fetchInterviewDetails = async () => {
    try {
      const apiRes = await axios.get(`${BASE_URL_PROD}/interview/single/${id}`);
      console.log(apiRes.data);
      setInterviewDetail(apiRes?.data);
    } catch (error) {
      console.error("Error Fetching interview Details:", error);
    }
  };


  const candidates = [
    {
      name: "Michael Chen",
      date: "Oct 20, 2025",
      score: 8.5,
      status: "Completed",
    },
    {
      name: "Sarah Williams",
      date: "Oct 27, 2025",
      status: "Pending",
    },
  ];

  useEffect(() => {
    fetchInterviewDetails();
  }, [id]);
  return (
    <Box className=" rounded-2xl shadow-lg space-y-8">
      {/* Header */}

      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          boxShadow: 5,
          padding: 2,
        }}
      >
<Link to="/dashboard">
            <ArrowBackIcon className="mr-2 text-gray-600" />
          </Link>

        <Typography
          variant="h5"
          sx={{
            fontWeight: "bold",
            textTransform: "uppercase",
          }}
        >
          Interveiw Details
        </Typography>

        {/* Actions */}
        <Box className="flex justify-end gap-2">
          <IconButton size="small" color="default">
            <FilterList />
          </IconButton>
          <IconButton size="small" color="default">
            <FileDownload />
          </IconButton>
        </Box>
      </Box>

      <Box
        sx={{
          paddingX: 5,
        }}
      >
        <Box className="flex justify-between items-start mb-3">
          <Box>
            <Typography variant="h5" fontWeight={"bold"}>
              {interviewDetail?.data?.jobTitle}
            </Typography>
            <Typography variant="body2" className="text-gray-500">
              Google Inc.
            </Typography>
          </Box>
          <Chip label="Active" color="success" size="small" />
        </Box>

        {/* Meta Info */}
        <Box className="flex flex-wrap gap-6 text-sm mb-3">
          <Box className="flex items-center gap-2">
            <AccessTime fontSize="small" />
            <span className="font-medium">
              {interviewDetail?.data?.interviewDuration}
            </span>
          </Box>
          <Box className="flex items-center gap-2">
            <CalendarToday fontSize="small" />
            <span className="font-medium">
              {interviewDetail?.data?.createdAt}
            </span>
          </Box>
          <Box className="flex items-center gap-2">
            <Label fontSize="small" />
            <span className="font-medium">
              {interviewDetail?.data?.interviewType}
            </span>
          </Box>
        </Box>

        {/* Description */}
        <Box>
          <Typography
            variant="subtitle1"
            fontWeight={"bold"}
            marginBottom={0.5}
          >
            Job Description
          </Typography>
          <Typography
            marginBottom={1}
            className="text-sm text-gray-700 leading-relaxed "
          >
            {interviewDetail?.data?.jobDescription}
          </Typography>
        </Box>

        {/* Interview Questions */}
        <Box>
          <Typography fontWeight={"bold"} variant="subtitle1" marginBottom={1}>
            Interview Questions
          </Typography>
          <ul className="list-disc pl-5 space-y-1 text-sm mb-5">
            {interviewDetail?.data?.questions.map((q, i) => (
              <li key={i}>{q}</li>
            ))}
          </ul>
        </Box>

        <Divider />

        {/* Candidates */}
        <Box>
          <Typography marginTop={2} variant="subtitle1">
            Candidates ({candidates.length})
          </Typography>
          <Box className="space-y-4 ">
            {candidates.map((cand, i) => (
              <Box
                key={i}
                className="flex justify-between items-center p-4 rounded-xl bg-gray-50 border border-gray-200"
              >
                <Box marginBottom={2} className="flex items-center gap-4">
                  <Avatar sx={{ bgcolor: "#1976d2", color: "#fff" }}>
                    {cand.name.charAt(0)}
                  </Avatar>
                  <Box>
                    <Typography className="font-medium text-sm text-gray-800">
                      {cand.name}
                    </Typography>
                    <Typography className="text-xs text-gray-500">
                      {cand.status === "Completed"
                        ? `Completed on ${cand.date}`
                        : `Pending – Scheduled for ${cand.date}`}
                    </Typography>
                  </Box>
                </Box>
                <Box className="flex items-center gap-4 ">
                  {cand.status === "Completed" ? (
                    <>
                      <Chip
                        label={`${cand.score}/10`}
                        color="success"
                        size="small"
                        sx={{ fontWeight: 500 }}
                      />
                     <Link to={"/candidate-report"}>
                     
                      <Button
                        variant="outlined"
                        size="small"
                        sx={{ textTransform: "none", fontSize: "0.75rem" }}
                      >
                        View Report
                      </Button>
                     </Link>
                    </>
                  ) : (
                    <>
                      <Chip
                        label="Pending"
                        color="warning"
                        size="small"
                        sx={{ fontWeight: 500 }}
                      />
                      <Button
                        variant="outlined"
                        size="small"
                        sx={{ textTransform: "none", fontSize: "0.75rem" }}
                      >
                        View Report
                      </Button>
                    </>
                  )}
                </Box>
              </Box>
            ))}
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default InterviewDetails;
