// import { Button, Card, Tooltip } from "@mui/material";
// import VisibilityIcon from "@mui/icons-material/Visibility";
// import { ContentCopy, Send } from "@mui/icons-material";
// import React from "react";
// import { Link } from "react-router-dom";

// const InterviewCard = ({ icon, data }) => {
//   // console.log(data);
//   const {
//     interviewDuration,
//     interviewType,
//     jobTitle,
//     createdAt,
//     questions,
//     jobDescription,
//     joinCode,
//     joinURL,
//     _id,
//   } = data;
//   return (
//     <Card
//       className="p-5 w-full max-w-sm shadow-md hover:shadow-lg transition-shadow duration-300 border border-gray-100"
//       sx={{ borderRadius: "16px", backgroundColor: "#fff" }}
//     >
//       {/* Header: Icon + Date */}
//       <div className="flex items-center justify-between mb-3">
//         <Tooltip title="Platform Icon">{icon}</Tooltip>
//         <span className="text-xs text-gray-500">{createdAt}</span>
//       </div>

//       {/* Role Title */}
//       <h3 className="text-xl font-semibold mb-1 text-gray-800">{jobTitle}</h3>

//       {/* Duration */}
//       <p className="text-sm text-gray-500 mb-4">{interviewDuration}</p>

//       {/* Actions */}
//       <div className="flex gap-2">
//         <Button
//           variant="outlined"
//           size="small"
//           startIcon={<ContentCopy />}
//           sx={{ textTransform: "none", color: "#6851FF" }}
//         >
//           Copy Link
//         </Button>
//         <Link to={`/interview/${_id}`}>
//           <Button
//             variant="outlined"
//             size="small"
//             startIcon={<VisibilityIcon />}
//             sx={{ textTransform: "none", color: "#6851FF" }}
//           >
//             View Details
//           </Button>
//         </Link>
//         <Button
//           variant="contained"
//           size="small"
//           startIcon={<Send />}
//           sx={{ textTransform: "none", backgroundColor: "#6851FF" }}
//         >
//           Send
//         </Button>
//       </div>
//     </Card>
//   );
// };

// export default InterviewCard;





























import { Button, Card, Tooltip, Typography } from "@mui/material";
import VisibilityIcon from "@mui/icons-material/Visibility";
import { ContentCopy, Send } from "@mui/icons-material";
import React, { useState } from "react";
import { Link } from "react-router-dom";

const InterviewCard = ({ icon, data }) => {
  const {
    interviewDuration,
    interviewType,
    jobTitle,
    createdAt,
    questions,
    jobDescription,
    joinCode,
    joinURL,
    _id,
  } = data;

  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(joinURL);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000); // Reset after 2s
    } catch (err) {
      console.error("Failed to copy URL", err);
    }
  };

  return (
    <Card
      className="p-5 w-full max-w-sm shadow-md hover:shadow-lg transition-shadow duration-300 border border-gray-100"
      sx={{ borderRadius: "16px", backgroundColor: "#fff" }}
    >
      {/* Header: Icon + Date */}
      <div className="flex items-center justify-between mb-3">
        <Tooltip title="Platform Icon">{icon}</Tooltip>
        <span className="text-xs text-gray-500">{createdAt}</span>
      </div>

      {/* Role Title */}
      <h3 className="text-xl font-semibold mb-1 text-gray-800">{jobTitle}</h3>

      {/* Duration */}
      <p className="text-sm text-gray-500 mb-4">{interviewDuration}</p>

      {/* Actions */}
      <div className="flex gap-2 items-center flex-wrap">
        <Button
          variant="outlined"
          size="small"
          startIcon={<ContentCopy />}
          onClick={handleCopy}
          sx={{ textTransform: "none", color: "#6851FF" }}
        >
          Copy Link
        </Button>

        {copied && (
          <Typography variant="body2" color="success.main">
            Copied!
          </Typography>
        )}

        <Link to={`/interview/${_id}`}>
          <Button
            variant="outlined"
            size="small"
            startIcon={<VisibilityIcon />}
            sx={{ textTransform: "none", color: "#6851FF" }}
          >
            View Details
          </Button>
        </Link>

        {/* <Button
          variant="contained"
          size="small"
          startIcon={<Send />}
          sx={{ textTransform: "none", backgroundColor: "#6851FF" }}
        >
          Send
        </Button> */}
      </div>
    </Card>
  );
};

export default InterviewCard;
