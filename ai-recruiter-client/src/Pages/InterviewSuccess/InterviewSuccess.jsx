import React from "react";
import { Button, Card, IconButton } from "@mui/material";
import { Email, WhatsApp, 
    // Slack,
     ContentCopy } from "@mui/icons-material";
import { Link } from "react-router-dom";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import { Layout } from "../../components";

const InterviewSuccess = () => {
  const interviewLink = "https://alcruiter.ai/interview/j8k9m2n3p4";

  const handleCopy = () => {
    navigator.clipboard.writeText(interviewLink);
  };

  return (
   <Layout>
     <div className="max-w-3xl mx-auto p-6 bg-white rounded-lg shadow-md">
      <div className="text-center mb-6">
        <CheckCircleIcon className="text-green-500" style={{ fontSize: 48 }} />
        <h2 className="text-xl font-bold mt-2">Your AI Interview is Ready!</h2>
        <p className="text-sm text-gray-500">
          Share this link with your candidates to start the interview process
        </p>
      </div>

      <Card className="p-4 mb-6 border border-gray-200">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3">
          <div className="flex-1">
            <label className="text-sm font-medium text-gray-600">
              Interview Link
            </label>
            <p className="text-sm font-mono mt-1">{interviewLink}</p>
            <div className="text-xs text-gray-500 mt-1 flex flex-wrap gap-3">
              <span>🕒 30 Minutes</span>
              <span>📋 10 Questions</span>
              <span>📅 Expires: Nov 20, 2025</span>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-xs text-blue-600 font-medium bg-blue-50 px-2 py-1 rounded-full">
              Valid for 30 days
            </span>
            <Button
              variant="contained"
              size="small"
              onClick={handleCopy}
              startIcon={<ContentCopy />}
              sx={{ textTransform: "none" }}
            >
              Copy Link
            </Button>
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
            sx={{ textTransform: "none" }}
          >
            + Create New Interview
          </Button>
        </Link>
      </div>
    </div>
   </Layout>
  );
};

export default InterviewSuccess;
