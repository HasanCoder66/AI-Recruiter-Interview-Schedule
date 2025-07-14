import React, { useEffect } from "react";
import { Button, Box, Typography, Paper } from "@mui/material";
import { Google } from "@mui/icons-material";
import { GoogleAuthProvider, signInWithPopup, getAuth } from "firebase/auth";
import { initializeApp } from "firebase/app";
import axios from "axios";

// Firebase config (replace with your own)
const firebaseConfig = {
  apiKey: "YOUR_FIREBASE_API_KEY",
  authDomain: "YOUR_PROJECT.firebaseapp.com",
  projectId: "YOUR_PROJECT_ID",
  appId: "YOUR_APP_ID",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

const Login = ({ onLogin }) => {
  const handleGoogleLogin = async () => {
    const provider = new GoogleAuthProvider();
    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;

      const userData = {
        name: user.displayName,
        email: user.email,
        avatar: user.photoURL,
        uid: user.uid,
      };

      // 🔥 Send to backend (store in MongoDB)
      await axios.post("https://your-backend-url/api/auth/google", userData);

      onLogin(userData);
    } catch (err) {
      console.error("Google Sign-in Error:", err);
    }
  };

  return (
    <Box className="flex justify-center items-center min-h-screen bg-gray-100">
      <Paper
        elevation={4}
        className="p-8 max-w-sm w-full text-center space-y-4"
      >
        <Typography variant="h5" fontWeight="bold">
          Login to AI Recruiter
        </Typography>
        <Button
          variant="contained"
          startIcon={<Google />}
          fullWidth
          onClick={handleGoogleLogin}
          sx={{ textTransform: "none" }}
        >
          Sign in with Google
        </Button>
      </Paper>
    </Box>
  );
};

export default Login;
