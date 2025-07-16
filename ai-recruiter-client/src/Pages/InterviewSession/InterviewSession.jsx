import React from "react";
import {
  Box,
  Typography,
  IconButton,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import MicIcon from "@mui/icons-material/Mic";
import CallEndIcon from "@mui/icons-material/CallEnd";

const InterviewSession = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm")); // <600px

  return (
    <Box
      sx={{
        backgroundColor: "#0B1120",
        minHeight: "100vh",
        py: 4,
        px: 2,
        color: "white",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      {/* Header */}
      <Box
        width="100%"
        maxWidth="1000px"
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        mb={3}
        px={isMobile ? 1 : 2}
      >
        <Typography variant="h6" fontWeight="600">
          AI Interview Session
        </Typography>
        <Typography fontSize={14}>⏱ 00:05:23</Typography>
      </Box>

      {/* Video Section */}
      <Box
        display="flex"
        flexWrap="wrap"
        justifyContent="center"
        gap={3}
        width="100%"
        maxWidth="1000px"
        mb={4}
      >
        {/* AI Interviewer */}
        <Box
          sx={{
            position: "relative",
            flex: "1 1 300px",
            maxWidth: 450,
            borderRadius: 3,
            overflow: "hidden",
            width: "100%",
          }}
        >
          <img
            src="https://avatars.githubusercontent.com/u/140997677?v=4"
            alt="AI Interviewer"
            style={{ width: "100%", height: "auto", display: "block" }}
          />
          <Typography
            variant="caption"
            sx={{
              position: "absolute",
              bottom: 8,
              left: 8,
              backgroundColor: "rgba(0,0,0,0.6)",
              padding: "2px 6px",
              borderRadius: 2,
              fontSize: "0.75rem",
            }}
          >
            AI Interviewer
          </Typography>
        </Box>

        {/* You */}
        <Box
          sx={{
            position: "relative",
            flex: "1 1 300px",
            maxWidth: 450,
            borderRadius: 3,
            overflow: "hidden",
            width: "100%",
          }}
        >
          <img
            src="https://randomuser.me/api/portraits/men/32.jpg"
            alt="You"
            style={{ width: "100%", height: "auto", display: "block" }}
          />
          <Typography
            variant="caption"
            sx={{
              position: "absolute",
              bottom: 8,
              left: 8,
              backgroundColor: "rgba(0,0,0,0.6)",
              padding: "2px 6px",
              borderRadius: 2,
              fontSize: "0.75rem",
            }}
          >
            You
          </Typography>
        </Box>
      </Box>

      {/* Control Buttons */}
      <Box display="flex" gap={3} alignItems="center" flexWrap="wrap">
        <IconButton
          sx={{
            backgroundColor: "#1E293B",
            color: "white",
            "&:hover": { backgroundColor: "#334155" },
          }}
          size="large"
        >
          <MicIcon />
        </IconButton>
        <IconButton
          sx={{
            backgroundColor: "#EF4444",
            color: "white",
            "&:hover": { backgroundColor: "#DC2626" },
          }}
          size="large"
        >
          <CallEndIcon />
        </IconButton>
      </Box>

      {/* Footer Text */}
      <Typography
        variant="body2"
        mt={3}
        sx={{ color: "#94A3B8", fontSize: "0.9rem" }}
      >
        Interview in progress...
      </Typography>
    </Box>
  );
};

export default InterviewSession;
