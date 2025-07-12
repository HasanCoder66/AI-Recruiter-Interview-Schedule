import React, { useState } from "react";
import { Button, Card } from "@mui/material";
import MicIcon from "@mui/icons-material/Mic";
import { useParams, useNavigate } from "react-router-dom";
import { Layout } from "../../components";

const mockQuestions = [
  "Tell me about yourself.",
  "What are your strengths and weaknesses?",
  "Why do you want this job?",
  "Describe a challenging situation you handled.",
  "Where do you see yourself in 5 years?",
];

const InterviewSession = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);

  const nextQuestion = () => {
    if (currentQuestionIndex < mockQuestions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      // Submit or go to results
      navigate("/interview-success"); // For now
    }
  };

  return (
   <Layout>
     <div className="max-w-2xl mx-auto p-6 bg-white rounded-lg shadow-md mt-6">
      <h2 className="text-xl font-semibold mb-2 text-center">
        AI Interview in Progress
      </h2>
      <p className="text-sm text-center text-gray-500 mb-4">
        Interview ID: <span className="font-mono">{id}</span>
      </p>

      <Card className="p-6 mb-4 text-center shadow">
        <p className="text-lg font-medium mb-4">
          {mockQuestions[currentQuestionIndex]}
        </p>
        <div className="flex justify-center">
          <MicIcon className="text-blue-600" style={{ fontSize: 48 }} />
        </div>
        <p className="text-xs text-gray-400 mt-2">Recording not enabled yet</p>
      </Card>

      <div className="flex justify-between">
        <span className="text-sm text-gray-500">
          Question {currentQuestionIndex + 1} of {mockQuestions.length}
        </span>
        <Button variant="contained" onClick={nextQuestion}>
          {currentQuestionIndex === mockQuestions.length - 1
            ? "Submit Interview"
            : "Next"}
        </Button>
      </div>
    </div>
   </Layout>
  );
};

export default InterviewSession;
