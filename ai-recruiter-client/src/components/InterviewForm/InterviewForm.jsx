// import React from "react";
// import { Snackbar, Alert } from "@mui/material";
// import axios from "axios";
// import {
//   TextField,
//   MenuItem,
//   Button,
//   Chip,
//   Box,
//   CircularProgress,
//   Typography,
// } from "@mui/material";
// import {
//   Code,
//   Psychology,
//   Work,
//   EmojiObjects,
//   Group,
// } from "@mui/icons-material";
// import { useState } from "react";
// import { BASE_URL } from "../../constants/baseUrl";

// const types = [
//   { label: "Technical", icon: <Code /> },
//   { label: "Behavioral", icon: <Psychology /> },
//   { label: "Experience", icon: <Work /> },
//   { label: "Problem Solving", icon: <EmojiObjects /> },
//   { label: "Leadership", icon: <Group /> },
// ];

// const durations = ["15 minutes", "30 minutes", "45 minutes", "60 minutes"];

// const InterviewForm = () => {
//   // States
//   const [jobTitle, setJobTitle] = useState("");
//   const [jobDescription, setJobDescription] = useState("");
//   const [duration, setDuration] = useState("15 minutes");
//   const [selectedTypes, setSelectedTypes] = useState(["Technical"]);
//   const [loading, setLoading] = useState(false);
//   const [questions, setQuestions] = useState([]);

//   const [toast, setToast] = useState({
//     open: false,
//     message: "",
//     severity: "success", // "error" | "info" | "warning"
//   });

//   //Console logs for debugging
//   console.log(jobTitle, "Job Title");
//   console.log(jobDescription, "jobDescription");
//   console.log(duration, "duration");

//   const handleToastClose = () => {
//     setToast({ ...toast, open: false });
//   };

//   const handleToggleType = (type) => {
//     setSelectedTypes((prev) =>
//       prev.includes(type) ? prev.filter((t) => t !== type) : [...prev, type]
//     );
//   };

//   // Handle form submission
//   const handleSubmit = async (e) => {
//     try {
//       setLoading(true);
//       const apiRes = await axios.post(
//         `${BASE_URL}/interview/create-interview`,
//         {
//           jobTitle,
//           jobDescription,
//           interviewDuration: duration,
//           interviewType: selectedTypes.join(", "),
//         }
//       );
//       console.log(apiRes, "API Response");
//       if (apiRes.status === 200) {
//         setQuestions(apiRes.data.data);
//         setToast({
//           open: true,
//           message: "Interview created and questions generated successfully!",
//           severity: "success",
//         });

//         console.log("Generated Questions", questions);
//       }
//     } catch (error) {
//       setToast({
//         open: true,
//         message:
//           error?.response?.data?.error ||
//           "Something went wrong while generating questions.",
//         severity: "error",
//       });
//       console.error("Error Submitting Form:", error.message);
//     } finally {
//       setLoading(false);
//       setJobTitle("");
//       setJobDescription("");
//       setDuration("15 minutes");
//     }
//   };

//   return (
//     <form className="space-y-6 ">
//       <TextField
//         onChange={(e) => setJobTitle(e.target.value)}
//         fullWidth
//         label="Job Position"
//         placeholder="e.g. Senior Frontend Developer"
//         sx={{
//           marginBottom: 2,
//         }}
//       />
//       <TextField
//         fullWidth
//         multiline
//         onChange={(e) => setJobDescription(e.target.value)}
//         minRows={4}
//         label="Job Description"
//         placeholder="Enter detailed job description…"
//         sx={{
//           marginBottom: 2,
//         }}
//       />
//       <TextField
//         select
//         fullWidth
//         onChange={(e) => setDuration(e.target.value)}
//         label="Interview Duration"
//         defaultValue="15 minutes"
//         sx={{
//           marginBottom: 2,
//         }}
//       >
//         {durations.map((dur) => (
//           <MenuItem key={dur} value={dur}>
//             {dur}
//           </MenuItem>
//         ))}
//       </TextField>

//       {/* Interview Type Chips */}
//       <div>
//         <Typography
//           variant="subtitle1"
//           sx={{
//             marginBottom: 1,
//             fontWeight: "medium",
//           }}
//         >
//           Interview Types
//         </Typography>
//         <Box className="flex flex-wrap gap-2">
//           {types.map((item) => (
//             <Chip
//               key={item.label}
//               icon={item.icon}
//               label={item.label}
//               onClick={() => handleToggleType(item.label)}
//               color={selectedTypes.includes(item.label) ? "primary" : "default"}
//               variant={
//                 selectedTypes.includes(item.label) ? "filled" : "outlined"
//               }
//               clickable
//             />
//           ))}
//         </Box>
//       </div>

//       {/* Info Box */}
//       {loading === false ? (
//         <Box className="p-3 border border-green-100 bg-green-50 rounded-lg">
//           <Typography variant="body2" color="textSecondary">
//             Click "Generate Questions" to create interview questions based on
//             the provided job details.
//           </Typography>
//         </Box>
//       ) : (
//         <Box className="flex items-center gap-2 p-3 border border-blue-100 bg-blue-50 rounded-lg">
//           <CircularProgress size={20} color="primary" />
//           <div>
//             <p className="text-sm font-medium text-blue-700">
//               Generating Interview Questions
//             </p>
//             <p className="text-xs text-blue-600">
//               Our AI is crafting personalized questions based on your
//               requirements...
//             </p>
//           </div>
//         </Box>
//       )}

//       {/* Actions */}
//       <div className="flex justify-between">
//         <Button variant="outlined" color="inherit">
//           Back
//         </Button>
//         {/* <Button
//         onClick={handleSubmit}
//           variant="contained"
//           color="primary"
//           endIcon={<span>➔</span>}
//           sx={{ textTransform: "none" }}
//         >
//           Generate Questions
//         </Button> */}

//         <Button
//           variant="contained"
//           color="primary"
//           endIcon={<span>➔</span>}
//           onClick={handleSubmit}
//           disabled={loading}
//           sx={{ textTransform: "none" }}
//         >
//           {loading ? "Generating..." : "Generate Questions"}
//         </Button>
//       </div>
//     </form>
//   );
// };

// export default InterviewForm;

























import React, { useState } from "react";
import axios from "axios";
import {Link} from "react-router-dom"
import {
  TextField,
  MenuItem,
  Button,
  Chip,
  Box,
  CircularProgress,
  Typography,
  Snackbar,
  Alert,
} from "@mui/material";
import {
  Code,
  Psychology,
  Work,
  EmojiObjects,
  Group,
} from "@mui/icons-material";
import { BASE_URL } from "../../constants/baseUrl";

const types = [
  { label: "Technical", icon: <Code /> },
  { label: "Behavioral", icon: <Psychology /> },
  { label: "Experience", icon: <Work /> },
  { label: "Problem Solving", icon: <EmojiObjects /> },
  { label: "Leadership", icon: <Group /> },
];

const durations = ["15 minutes", "30 minutes", "45 minutes", "60 minutes"];

const InterviewForm = () => {
  // States
  const [jobTitle, setJobTitle] = useState("");
  const [jobDescription, setJobDescription] = useState("");
  const [duration, setDuration] = useState("15 minutes");
  const [selectedTypes, setSelectedTypes] = useState(["Technical"]);
  const [loading, setLoading] = useState(false);
  const [questions, setQuestions] = useState([]);

  const [toast, setToast] = useState({
    open: false,
    message: "",
    severity: "success", // success | error | warning | info
  });

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
      const apiRes = await axios.post(`${BASE_URL}/interview/create-interview`, {
        jobTitle,
        jobDescription,
        interviewDuration: duration,
        interviewType: selectedTypes.join(", "),
      });

      if (apiRes.status === 200) {
        setQuestions(apiRes.data.data);
        setToast({
          open: true,
          message: "Interview created and questions generated successfully!",
          severity: "success",
        });
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
          <Typography variant="subtitle1" sx={{ marginBottom: 1, fontWeight: "medium" }}>
            Interview Types
          </Typography>
          <Box className="flex flex-wrap gap-2">
            {types.map((item) => (
              <Chip
                key={item.label}
                icon={item.icon}
                label={item.label}
                onClick={() => handleToggleType(item.label)}
                color={selectedTypes.includes(item.label) ? "primary" : "default"}
                variant={selectedTypes.includes(item.label) ? "filled" : "outlined"}
                clickable
              />
            ))}
          </Box>
        </div>

        {/* Info Box */}
        {!loading ? (
          <Box className="p-3 border border-green-100 bg-green-50 rounded-lg">
            <Typography variant="body2" color="textSecondary">
              Click "Generate Questions" to create interview questions based on the provided job
              details.
            </Typography>
          </Box>
        ) : (
          <Box className="flex items-center gap-2 p-3 border border-blue-100 bg-blue-50 rounded-lg">
            <CircularProgress size={20} color="primary" />
            <div>
              <p className="text-sm font-medium text-blue-700">Generating Interview Questions</p>
              <p className="text-xs text-blue-600">
                Our AI is crafting personalized questions based on your requirements...
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