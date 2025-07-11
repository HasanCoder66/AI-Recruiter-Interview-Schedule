// src/pages/Home.jsx
import { Button, Card, Typography } from "@mui/material";
import React from "react";
const Home = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-app-gradient p-4">
      <Card className="p-6 max-w-md w-full shadow-lg rounded-2xl text-center">
        <Typography variant="h4" gutterBottom>
          AI Recruiter
        </Typography>
        <Typography variant="body1" className="mb-4">
          Welcome! You have <strong>3 free interviews</strong> remaining.
        </Typography>
        <Button variant="contained" size="large" color="primary">
          Start Interview
        </Button>
      </Card>
    </div>
  );
};

export default Home;
