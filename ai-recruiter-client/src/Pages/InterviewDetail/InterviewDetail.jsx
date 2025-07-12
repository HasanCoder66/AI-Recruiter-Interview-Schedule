// import React from "react";
// import {
//   Box,
//   Typography,
//   Chip,
//   Divider,
//   Avatar,
//   Button,
//   IconButton,
// } from "@mui/material";
// import {
//   AccessTime,
//   CalendarToday,
//   Label,
//   FilterList,
//   FileDownload,
//   CheckCircle,
//   PendingActions,
// } from "@mui/icons-material";

// const InterviewDetails = () => {
//   const questions = [
//     "Explain the concept of middleware in Node.js",
//     "How do you handle state management in React?",
//     "Describe a challenging project you've worked on",
//   ];

//   const candidates = [
//     {
//       name: "Michael Chen",
//       date: "Oct 20, 2025",
//       score: 8.5,
//       status: "Completed",
//     },
//     {
//       name: "Sarah Williams",
//       date: "Oct 27, 2025",
//       status: "Pending",
//     },
//   ];

//   return (
//     <Box className="p-6 bg-white rounded-xl shadow-md space-y-6">
//       <Box className="flex justify-between items-start">
//         <Box>
//           <Typography variant="h6" className="font-bold">
//             Full Stack Developer
//           </Typography>
//           <Typography variant="body2" className="text-gray-600">
//             Google Inc.
//           </Typography>
//         </Box>
//         <Chip label="Active" color="success" className="text-sm" />
//       </Box>

//       <Box className="flex flex-wrap gap-6 text-sm text-gray-600">
//         <Box className="flex items-center gap-2">
//           <AccessTime fontSize="small" /> 45 Minutes
//         </Box>
//         <Box className="flex items-center gap-2">
//           <CalendarToday fontSize="small" /> Oct 15, 2025
//         </Box>
//         <Box className="flex items-center gap-2">
//           <Label fontSize="small" /> Technical + Behavioral
//         </Box>
//       </Box>

//       <Box>
//         <Typography className="font-semibold mb-1">Job Description</Typography>
//         <Typography className="text-sm text-gray-700">
//           We're looking for a Full Stack Developer with 5+ years of experience in
//           React, Node.js, and cloud technologies. The ideal candidate should have
//           strong problem-solving skills and experience with agile methodologies.
//         </Typography>
//       </Box>

//       <Box>
//         <Typography className="font-semibold mb-1">Interview Questions</Typography>
//         <ul className="list-disc pl-5 space-y-1 text-sm text-gray-800">
//           {questions.map((q, i) => (
//             <li key={i}>{q}</li>
//           ))}
//         </ul>
//       </Box>

//       <Divider />

//       <Box>
//         <Typography className="font-semibold mb-3">Candidates (3)</Typography>
//         <Box className="space-y-4">
//           {candidates.map((cand, i) => (
//             <Box
//               key={i}
//               className="flex justify-between items-center p-4 border rounded-lg bg-gray-50"
//             >
//               <Box className="flex items-center gap-4">
//                 <Avatar>{cand.name.charAt(0)}</Avatar>
//                 <Box>
//                   <Typography className="font-medium text-sm">
//                     {cand.name}
//                   </Typography>
//                   <Typography className="text-xs text-gray-600">
//                     {cand.status === "Completed"
//                       ? `Completed on ${cand.date}`
//                       : `Pending – Scheduled for ${cand.date}`}
//                   </Typography>
//                 </Box>
//               </Box>
//               <Box className="flex items-center gap-4">
//                 {cand.status === "Completed" ? (
//                   <>
//                     <Chip
//                       label={`${cand.score}/10`}
//                       color="success"
//                       size="small"
//                     />
//                     <Button variant="text" size="small">
//                       View Report
//                     </Button>
//                   </>
//                 ) : (
//                   <>
//                     <Chip label="Pending" color="warning" size="small" />
//                     <Button variant="text" size="small">
//                       View Report
//                     </Button>
//                   </>
//                 )}
//               </Box>
//             </Box>
//           ))}
//         </Box>
//       </Box>

//       {/* Action Buttons */}
//       <Box className="flex justify-end gap-2">
//         <IconButton size="small">
//           <FilterList />
//         </IconButton>
//         <IconButton size="small">
//           <FileDownload />
//         </IconButton>
//       </Box>
//     </Box>
//   );
// };

// export default InterviewDetails;

import React from "react";
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

const InterviewDetails = () => {
  const questions = [
    "Explain the concept of middleware in Node.js",
    "How do you handle state management in React?",
    "Describe a challenging project you've worked on",
  ];

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
              Full Stack Developer
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
            <span className="font-medium">45 Minutes</span>
          </Box>
          <Box className="flex items-center gap-2">
            <CalendarToday fontSize="small" />
            <span className="font-medium">Oct 15, 2025</span>
          </Box>
          <Box className="flex items-center gap-2">
            <Label fontSize="small" />
            <span className="font-medium">Technical + Behavioral</span>
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
            We're looking for a Full Stack Developer with 5+ years of experience
            in React, Node.js, and cloud technologies. The ideal candidate
            should have strong problem-solving skills and experience with agile
            methodologies.
          </Typography>
        </Box>

        {/* Interview Questions */}
        <Box>
          <Typography
            fontWeight={"bold"}
            variant="subtitle1"
            marginBottom={1}
          >
            Interview Questions
          </Typography>
          <ul className="list-disc pl-5 space-y-1 text-sm mb-5">
            {questions.map((q, i) => (
              <li key={i}>{q}</li>
            ))}
          </ul>
        </Box>

        <Divider />

        {/* Candidates */}
        <Box>
          <Typography
          marginTop={2} variant="subtitle1">
            Candidates ({candidates.length})
          </Typography>
          <Box className="space-y-4 ">
            {candidates.map((cand, i) => (
              <Box
                key={i}
                className="flex justify-between items-center p-4 rounded-xl bg-gray-50 border border-gray-200"
              >
                <Box
                marginBottom={2}
                className="flex items-center gap-4">
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
                      <Button
                        variant="outlined"
                        size="small"
                        sx={{ textTransform: "none", fontSize: "0.75rem" }}
                      >
                        View Report
                      </Button>
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
