// import React from "react";
// import { Box, Button, Paper, Typography } from "@mui/material";
// import { Google } from "@mui/icons-material";
// import { GoogleAuthProvider, signInWithPopup, getAuth } from "firebase/auth";
// import { initializeApp } from "firebase/app";
// import axios from "axios";
// import { aiLogin } from "../../assets";
// import { BASE_URL_PROD } from "../../constants/baseUrl";
// import { useNavigate } from "react-router-dom";
// import { useDispatch } from "react-redux";
// import { login } from "../../redux/Slices/authSlices";

// // ✅ Your Firebase Config (replace with real values or import from firebase.js)
// const firebaseConfig = {
//   apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
//   authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
//   projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
//   appId: import.meta.env.VITE_FIREBASE_APP_ID,
// };

// // ✅ Initialize Firebase
// const app = initializeApp(firebaseConfig);
// const auth = getAuth(app);

// const Login = ({ onLogin }) => {
//   const navigate = useNavigate();
//   const dispatch = useDispatch();

//   const handleGoogleLogin = async () => {
//     const provider = new GoogleAuthProvider();
//     try {
//       const result = await signInWithPopup(auth, provider);
//       const user = result.user;

//       const userData = {
//         name: user.displayName,
//         email: user.email,
//         avatar: user.photoURL,
//         uid: user.uid,
//       };

//       // ✅ Send user data to backend
//       await axios.post(
//         // "https://ai-recruiter-interview-schedule-be.vercel.app/api/auth/google",
//         `${BASE_URL_PROD}/auth/google`,
//         userData
//       );

//       onLogin?.(userData); // optional chaining
//       dispatch(login(userData));
//       navigate("/dashboard");
//     } catch (err) {
//       console.error("Google Sign-in Error:", err.message);
//     }
//   };

//   return (
//     <Box className="min-h-screen flex items-center justify-center bg-gradient-to-r from-sky-50 to-indigo-100 p-4">
//       <Paper
//         elevation={6}
//         className="w-full max-w-4xl flex flex-col md:flex-row overflow-hidden rounded-2xl shadow-lg"
//       >
//         {/* Left Image Section */}
//         <Box className="w-full md:w-1/2 bg-indigo-100 flex items-center justify-center p-6">
//           <img
//             src={aiLogin}
//             alt="AI Interview Illustration"
//             className="max-h-72 object-contain"
//           />
//         </Box>

//         {/* Right Login Box */}
//         <Box className="w-full md:w-1/2 p-8 space-y-6 flex flex-col justify-center">
//           <div>
//             <Typography
//               variant="h4"
//               fontWeight="bold"
//               gutterBottom
//               fontSize={32}
//             >
//               Welcome to AI Recruiter
//             </Typography>
//             <Typography variant="body1" color="text.secondary">
//               Sign in with Google to continue
//             </Typography>
//           </div>

//           <Button
//             variant="contained"
//             startIcon={<Google />}
//             onClick={handleGoogleLogin}
//             fullWidth
//             size="large"
//             sx={{
//               textTransform: "none",
//               backgroundColor: "#6851ff",
//               "&:hover": { backgroundColor: "#6111ff" },
//               fontWeight: 600,
//             }}
//           >
//             Sign in with Google
//           </Button>
//         </Box>
//       </Paper>
//     </Box>
//   );
// };

// export default Login;






























import React, { useEffect } from "react";
import { Box, Button, Paper, Typography } from "@mui/material";
import { Google } from "@mui/icons-material";
import { GoogleAuthProvider, signInWithPopup, getAuth } from "firebase/auth";
import { initializeApp } from "firebase/app";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../../redux/Slices/authSlices";
import { aiLogin } from "../../assets";
import { BASE_URL_PROD } from "../../constants/baseUrl";

// ✅ Firebase Config from environment
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
};

// ✅ Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user);

  // 🔐 If already logged in, redirect to dashboard
  useEffect(() => {
    if (user) {
      navigate("/dashboard");
    }
  }, [user, navigate]);

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

      // ✅ Send to backend and dispatch to Redux
      await axios.post(`${BASE_URL_PROD}/auth/google`, userData);
      dispatch(login(userData));
      navigate("/dashboard");
    } catch (err) {
      console.error("Google Sign-in Error:", err.message);
    }
  };

  return (
    <Box className="min-h-screen flex items-center justify-center bg-gradient-to-r from-sky-50 to-indigo-100 p-4">
      <Paper
        elevation={6}
        className="w-full max-w-4xl flex flex-col md:flex-row overflow-hidden rounded-2xl shadow-lg"
      >
        {/* Left Image Section */}
        <Box className="w-full md:w-1/2 bg-indigo-100 flex items-center justify-center p-6">
          <img
            src={aiLogin}
            alt="AI Interview Illustration"
            className="max-h-72 object-contain"
          />
        </Box>

        {/* Right Login Box */}
        <Box className="w-full md:w-1/2 p-8 space-y-6 flex flex-col justify-center">
          <div>
            <Typography variant="h4" fontWeight="bold" gutterBottom fontSize={32}>
              Welcome to AI Recruiter
            </Typography>
            <Typography variant="body1" color="text.secondary">
              Sign in with Google to continue
            </Typography>
          </div>

          <Button
            variant="contained"
            startIcon={<Google />}
            onClick={handleGoogleLogin}
            fullWidth
            size="large"
            sx={{
              textTransform: "none",
              backgroundColor: "#6851ff",
              "&:hover": { backgroundColor: "#6111ff" },
              fontWeight: 600,
            }}
          >
            Sign in with Google
          </Button>
        </Box>
      </Paper>
    </Box>
  );
};

export default Login;