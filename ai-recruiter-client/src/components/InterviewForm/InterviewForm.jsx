import React from "react";
import {
  Code,
  // Slack,
  ContentCopy,
  Email,
  EmojiObjects,
  Group,
  Psychology,
  WhatsApp,
  Work,
} from "@mui/icons-material";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import {
  Alert,
  Box,
  Button,
  Card,
  Chip,
  CircularProgress,
  MenuItem,
  Paper,
  Snackbar,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import axios from "axios";
import { useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { BASE_URL_PROD } from "../../constants/baseUrl";

const types = [
  { label: "Technical", icon: <Code /> },
  { label: "Behavioral", icon: <Psychology /> },
  { label: "Experience", icon: <Work /> },
  { label: "Problem Solving", icon: <EmojiObjects /> },
  { label: "Leadership", icon: <Group /> },
];

const durations = ["15 minutes", "30 minutes", "45 minutes", "60 minutes"];

const InterviewForm = ({ step, setStep }) => {
  // States
  const [jobTitle, setJobTitle] = useState("");
  const [jobDescription, setJobDescription] = useState("");
  const [duration, setDuration] = useState("15 minutes");
  const [selectedTypes, setSelectedTypes] = useState(["Technical"]);
  const [loading, setLoading] = useState(false);
  const [copied, setCopied] = useState(false);
  const [data, setData] = useState([]);
  // console.log("Api Response :", data);

  const { user } = useSelector((state) => state.auth);
  // console.log(user.uid)

  const [toast, setToast] = useState({
    open: false,
    message: "",
    severity: "success", // success | error | warning | info
  });

  const handleCopy = () => {
    navigator.clipboard.writeText(data?.joinURL);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  const handleToastClose = () => {
    setToast({ ...toast, open: false });
  };

  const handleToggleType = (type) => {
    setSelectedTypes((prev) =>
      prev.includes(type) ? prev.filter((t) => t !== type) : [...prev, type]
    );
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const apiRes = await axios.post(
        // `${BASE_URL}/interview/create`,
        `${BASE_URL_PROD}/interview/create`,
        {
          jobTitle,
          jobDescription,
          interviewDuration: duration,
          interviewType: selectedTypes.join(", "),
          uid: user?.uid,
        }
      );
      // console.log(apiRes, "API Response");
      if (apiRes.status === 200) {
        // setQuestions(apiRes.data.data.questions);
        // setQuestions(apiRes?.data?.data);
        setData(apiRes?.data?.data);
        setToast({
          open: true,
          message: "Interview created and questions generated successfully!",
          severity: "success",
        });
        // if api is working fine then step should be set to 1
        setStep(1);
      }
    } catch (error) {
      setToast({
        open: true,
        message:
          error?.response?.data?.error ||
          "Something went wrong while generating questions.",
        severity: "error",
      });
      console.error("Error Submitting Form:", error.message);
    } finally {
      setLoading(false);
      setJobTitle("");
      setJobDescription("");
      setDuration("15 minutes");
    }
  };

  return (
    <>
      {step === 0 ? (
        <form className="space-y-6" onSubmit={handleSubmit}>
          <TextField
            value={jobTitle}
            onChange={(e) => setJobTitle(e.target.value)}
            fullWidth
            label="Job Position"
            placeholder="e.g. Senior Frontend Developer"
            sx={{ marginBottom: 2 }}
          />

          <TextField
            value={jobDescription}
            onChange={(e) => setJobDescription(e.target.value)}
            fullWidth
            multiline
            minRows={4}
            label="Job Description"
            placeholder="Enter detailed job description…"
            sx={{ marginBottom: 2 }}
          />

          <TextField
            select
            fullWidth
            value={duration}
            onChange={(e) => setDuration(e.target.value)}
            label="Interview Duration"
            sx={{ marginBottom: 2 }}
          >
            {durations.map((dur) => (
              <MenuItem key={dur} value={dur}>
                {dur}
              </MenuItem>
            ))}
          </TextField>

          <div>
            <Typography
              variant="subtitle1"
              sx={{ marginBottom: 1, fontWeight: "medium" }}
            >
              Interview Types
            </Typography>
            <Box className="flex flex-wrap gap-2">
              {types.map((item) => (
                <Chip
                  key={item.label}
                  icon={item.icon}
                  label={item.label}
                  onClick={() => handleToggleType(item.label)}
                  color={
                    selectedTypes.includes(item.label) ? "primary" : "default"
                  }
                  variant={
                    selectedTypes.includes(item.label) ? "filled" : "outlined"
                  }
                  clickable
                />
              ))}
            </Box>
          </div>

          {/* Info Box */}
          {!loading ? (
            <Box className="p-3 border border-green-100 bg-green-50 rounded-lg">
              <Typography variant="body2" color="textSecondary">
                Click "Generate Questions" to create interview questions based
                on the provided job details.
              </Typography>
            </Box>
          ) : (
            <Box className="flex items-center gap-2 p-3 border border-blue-100 bg-blue-50 rounded-lg">
              <CircularProgress size={20} color="primary" />
              <div>
                <p className="text-sm font-medium text-blue-700">
                  Generating Interview Questions
                </p>
                <p className="text-xs text-blue-600">
                  Our AI is crafting personalized questions based on your
                  requirements...
                </p>
              </div>
            </Box>
          )}

          {/* Actions */}
          <div className="flex justify-between">
            <Link to="/">
              <Button variant="outlined" color="inherit">
                Back
              </Button>
            </Link>
            <Button
              type="submit"
              variant="contained"
              color="primary"
              endIcon={<span>➔</span>}
              disabled={loading}
              sx={{ textTransform: "none" }}
            >
              {loading ? "Generating..." : "Generate Questions"}
            </Button>
          </div>
        </form>
      ) : step === 1 ? (
        // STEP 1: SHOW QUESTIONS
        <Box className="space-y-6">
          {/* Heading */}
          {/* <Typography variant="h5" fontWeight="bold" className="text-gray-800">
        Generated Interview Questions
      </Typography> */}

          {/* Question Cards */}
          <Stack spacing={2}>
            {data?.questions?.map((q, i) => (
              <Paper
                key={i}
                elevation={3}
                className="p-4 rounded-2xl bg-white shadow-md border border-gray-100 mb-1"
              >
                <Typography
                  variant="subtitle1"
                  fontWeight="bold"
                  className="text-gray-900"
                >
                  Q{i + 1}. {q}
                </Typography>
              </Paper>
            ))}
          </Stack>

          {/* Buttons */}
          <Box className="flex justify-between gap-3 pt-4">
            <Button
              variant="outlined"
              onClick={() => setStep(0)}
              sx={{
                textTransform: "none",
                borderRadius: 2,
                fontWeight: 500,
                px: 4,
              }}
            >
              Back
            </Button>

            {/* <Link to={"/interview-success"}> */}
            <Button
              variant="contained"
              onClick={() => setStep(2)}
              // onClick={handleProceed}
              sx={{
                backgroundColor: "#6851ff",
                "&:hover": { backgroundColor: "#6811ff" },
                textTransform: "none",
                borderRadius: 2,
                fontWeight: 600,
                px: 4,
              }}
            >
              Continue
            </Button>
            {/* </Link> */}
          </Box>
        </Box>
      ) : step === 2 ? (
        <div className="max-w-3xl mx-auto p-6 bg-white rounded-lg shadow-md">
          <div className="text-center mb-6">
            <CheckCircleIcon
              className="text-green-500"
              style={{ fontSize: 48 }}
            />
            <h2 className="text-xl font-bold mt-2">
              Your AI Interview is Ready!
            </h2>
            <p className="text-sm text-gray-500">
              Share this link with your candidates to start the interview
              process
            </p>
          </div>

          <Card className="p-4 mb-6 border border-gray-200">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3">
              <div className="flex-1">
                <label className="text-sm font-medium text-gray-600">
                  Interview Link
                </label>
                <p className="text-sm font-mono mt-1">{data?.joinURL}</p>
                <div className="text-xs text-gray-500 mt-1 flex flex-wrap gap-3">
                  <span>🕒 {data?.interviewDuration}</span>
                  <span>📋 {data?.questions?.length} Questions</span>
                  <span>📅 Expires: Nov 20, 2025</span>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-xs text-[#6851ff] font-medium bg-blue-50 px-2 py-1 rounded-full">
                  Valid for 30 days
                </span>
                <Button
                  // variant="contained"
                  size="small"
                  onClick={handleCopy}
                  startIcon={<ContentCopy />}
                  sx={{
                    textTransform: "none",
                    backgroundColor: "#6851ff",
                    color: "white",
                  }}
                >
                  Copy Link
                </Button>
                {copied && (
                  <Typography variant="body2" color="success.main">
                    Copied!
                  </Typography>
                )}
              </div>
            </div>
          </Card>

          <div className="mb-6">
            <h4 className="text-sm font-medium mb-2">Share via</h4>
            <div className="flex gap-4">
              <Button
                variant="outlined"
                startIcon={<Email />}
                sx={{ textTransform: "none", flex: 1 }}
              >
                Email
              </Button>
              <Button
                variant="outlined"
                // startIcon={<Slack />}
                sx={{ textTransform: "none", flex: 1 }}
              >
                Slack
              </Button>
              <Button
                variant="outlined"
                startIcon={<WhatsApp />}
                sx={{ textTransform: "none", flex: 1 }}
              >
                WhatsApp
              </Button>
            </div>
          </div>

          <div className="flex justify-between gap-3 flex-wrap">
            <Link to="/">
              <Button
                variant="outlined"
                startIcon={<span>←</span>}
                sx={{ textTransform: "none" }}
              >
                Back to Dashboard
              </Button>
            </Link>

            <Link to="/create-interview">
              <Button
                variant="contained"
                sx={{
                  textTransform: "none",
                  backgroundColor: "#6851ff",
                  color: "white",
                }}
              >
                + Create New Interview
              </Button>
            </Link>
          </div>
        </div>
      ) : (
        <></>
      )}

      {/* Toast Snackbar */}
      <Snackbar
        open={toast.open}
        autoHideDuration={4000}
        onClose={handleToastClose}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
        // sx={{ top: "250", right: 0 }}
      >
        <Alert
          onClose={handleToastClose}
          severity={toast.severity}
          variant="filled"
          sx={{ width: "100%" }}
        >
          {toast.message}
        </Alert>
      </Snackbar>
    </>
  );
};

export default InterviewForm;
