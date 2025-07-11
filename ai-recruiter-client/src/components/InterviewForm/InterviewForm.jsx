import React from "react";
import {
  TextField,
  MenuItem,
  Button,
  Chip,
  Box,
  CircularProgress,
  Typography,
} from "@mui/material";
import {
  Code,
  Psychology,
  Work,
  EmojiObjects,
  Group,
} from "@mui/icons-material";
import { useState } from "react";

const types = [
  { label: "Technical", icon: <Code /> },
  { label: "Behavioral", icon: <Psychology /> },
  { label: "Experience", icon: <Work /> },
  { label: "Problem Solving", icon: <EmojiObjects /> },
  { label: "Leadership", icon: <Group /> },
];

const durations = ["15 minutes", "30 minutes", "45 minutes", "60 minutes"];

const InterviewForm = () => {
  const [selectedTypes, setSelectedTypes] = useState(["Technical"]);
  const [loading, setLoading] = useState(true);

  const handleToggleType = (type) => {
    setSelectedTypes((prev) =>
      prev.includes(type) ? prev.filter((t) => t !== type) : [...prev, type]
    );
  };

  return (
    <form className="space-y-6 ">
      <TextField
        fullWidth
        label="Job Position"
        placeholder="e.g. Senior Frontend Developer"
        sx={{
          marginBottom: 2,
        }}
      />
      <TextField
        fullWidth
        multiline
        minRows={4}
        label="Job Description"
        placeholder="Enter detailed job description…"
        sx={{
          marginBottom: 2,
        }}
      />
      <TextField
        select
        fullWidth
        label="Interview Duration"
        defaultValue="15 minutes"
        sx={{
          marginBottom: 2,
        }}
      >
        {durations.map((dur) => (
          <MenuItem key={dur} value={dur}>
            {dur}
          </MenuItem>
        ))}
      </TextField>

      {/* Interview Type Chips */}
      <div>
        <Typography
          variant="subtitle1"
          sx={{
            marginBottom: 1,
            fontWeight: "medium",
          }}
        >
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
              variant={
                selectedTypes.includes(item.label) ? "filled" : "outlined"
              }
              clickable
            />
          ))}
        </Box>
      </div>

      {/* Info Box */}
      <Box className="flex items-center gap-2 p-3 border border-blue-100 bg-blue-50 rounded-lg">
        <CircularProgress size={20} color="primary" />
        <div>
          <p className="text-sm font-medium text-blue-700">
            Generating Interview Questions
          </p>
          <p className="text-xs text-blue-600">
            Our AI is crafting personalized questions based on your
            requirements...
          </p>
        </div>
      </Box>

      {/* Actions */}
      <div className="flex justify-between">
        <Button variant="outlined" color="inherit">
          Cancel
        </Button>
        <Button
          variant="contained"
          color="primary"
          endIcon={<span>➔</span>}
          sx={{ textTransform: "none" }}
        >
          Generate Questions
        </Button>
      </div>
    </form>
  );
};

export default InterviewForm;
