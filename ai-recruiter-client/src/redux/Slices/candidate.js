// redux/Slices/candidate.js
import { createSlice } from "@reduxjs/toolkit";

const candidateSlice = createSlice({
  name: "candidate",
  initialState: {
    candidateName: "",
    candidateId: "",
    jobTitle: "", // ✅ Add this
    feedback : {},
  },
  reducers: {
    setCandidateName: (state, action) => {
      state.candidateName = action.payload;
    },
    setCandidateId: (state, action) => {
      state.candidateId = action.payload;
    },
    setJobTitle: (state, action) => {
      state.jobTitle = action.payload; // ✅ Add this reducer
    },
    setFeedbackData: (state, action) => {
      state.feedback = action.payload; // ✅ Add this reducer
    },
  },
});

export const { setCandidateName, setJobTitle, setCandidateId, setFeedbackData } =
  candidateSlice.actions;
export default candidateSlice.reducer;
