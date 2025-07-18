// redux/Slices/candidate.js
import { createSlice } from "@reduxjs/toolkit";

const candidateSlice = createSlice({
  name: "candidate",
  initialState: {
    candidateName: "",
    jobTitle: "", // ✅ Add this
  },
  reducers: {
    setCandidateName: (state, action) => {
      state.candidateName = action.payload;
    },
    setJobTitle: (state, action) => {
      state.jobTitle = action.payload; // ✅ Add this reducer
    },
  },
});

export const { setCandidateName, setJobTitle } = candidateSlice.actions;
export default candidateSlice.reducer;
