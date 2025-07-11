// import { Button, Card } from "@mui/material";
// import React from "react";
// const InterviewCard = ({ icon, date }) => {
//   return (
//     <Card className="p-4 w-full max-w-sm shadow-md">
//       <div className="flex items-center justify-between mb-2">
//         <div>{icon}</div>
//         <div className="text-sm text-gray-500">{date}</div>
//       </div>
//       <h3 className="font-semibold text-lg">Full Stack Developer</h3>
//       <p className="text-sm text-gray-500 mb-4">30 Min</p>
//       <div className="flex gap-2">
//         <Button variant="outlined" size="small">Copy Link</Button>
//         <Button variant="contained" size="small">Send</Button>
//       </div>
//     </Card>
//   );
// };

// export default InterviewCard;




import { Button, Card, Tooltip } from "@mui/material";
import { ContentCopy, Send } from "@mui/icons-material";
import React from "react";

const InterviewCard = ({ icon, date, title = "Full Stack Developer", duration = "30 Min" }) => {
  return (
    <Card
      className="p-5 w-full max-w-sm shadow-md hover:shadow-lg transition-shadow duration-300 border border-gray-100"
      sx={{ borderRadius: "16px", backgroundColor: "#fff" }}
    >
      {/* Header: Icon + Date */}
      <div className="flex items-center justify-between mb-3">
        <Tooltip title="Platform Icon">{icon}</Tooltip>
        <span className="text-xs text-gray-500">{date}</span>
      </div>

      {/* Role Title */}
      <h3 className="text-xl font-semibold mb-1 text-gray-800">{title}</h3>

      {/* Duration */}
      <p className="text-sm text-gray-500 mb-4">{duration}</p>

      {/* Actions */}
      <div className="flex gap-2">
        <Button
          variant="outlined"
          size="small"
          startIcon={<ContentCopy />}
          sx={{ textTransform: "none" }}
        >
          Copy Link
        </Button>
        <Button
          variant="contained"
          size="small"
          startIcon={<Send />}
          sx={{ textTransform: "none", backgroundColor: "#6851FF" }}
        >
          Send
        </Button>
      </div>
    </Card>
  );
};

export default InterviewCard;
