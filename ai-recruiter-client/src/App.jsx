import React from "react";
import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Dashboard from "./Pages/Dashoboard/Dashboard";
import CreateInterview from "./Pages/CreateInterview/CreateInterview";
import InterviewSuccess from "./Pages/InterviewSuccess/InterviewSuccess";
import InterviewSession from "./Pages/InterviewSession/InterviewSession";
import InterviewDetails from "./Pages/InterviewDetail/InterviewDetail";
import Login from "./Pages/Login/Login";
import ProtectedRoute from "./ProtectedRoute/ProtectRoute";
import JoinInterview from "./Pages/JoinInterview/JoinInterview";
// import InterviewSession from "./Pages/InterviewSession"; // create this later

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />{" "}
            </ProtectedRoute>
          }
        />
        <Route
          path="/create-interview"
          element={
            <ProtectedRoute>
              <CreateInterview />{" "}
            </ProtectedRoute>
          }
        />
        <Route
          path="/interview-success"
          element={
            <ProtectedRoute>
              <InterviewSuccess />
            </ProtectedRoute>
          }
        />
        {/* <Route
          path="/interview/:id"
          element={
            <ProtectedRoute>
              <InterviewSession />
            </ProtectedRoute>
          }
        /> */}
        <Route
          path="/interview/:id"
          element={
            <ProtectedRoute>
              <InterviewDetails />
            </ProtectedRoute>
          }
        />
        <Route
          path="/join/interview/:joinCode"
          element={
            <ProtectedRoute>
              <JoinInterview />
            </ProtectedRoute>
          }
        />
        <Route path="/interview-session" element={<InterviewSession />} />
      </Routes>
    </Router>
  );
};

export default App;
