import { createSlice } from '@reduxjs/toolkit';

const interviewSlice = createSlice({
  name: 'interview',
  initialState: {
    questions: [],
    currentQuestionIndex: 0,
    // candidate: null,
    interviewData: null,
  },
  reducers: {
    setQuestions: (state, action) => {
      state.questions = action.payload;
    },
    nextQuestion: (state) => {
      if (state.currentQuestionIndex < state.questions.length - 1) {
        state.currentQuestionIndex += 1;
      }
    },
    resetInterview: (state) => {
      state.questions = [];
      state.currentQuestionIndex = 0;
    },
    setInterviewData: (state, action) => {
      state.interviewData = action.payload;
    },
    // setCandidate: (state, action) => {
    //   state.candidate = action.payload;
    // },
  },
});

export const {
  setQuestions,
  nextQuestion,
  resetInterview,
  setInterviewData,
  setCandidate,
} = interviewSlice.actions;

export default interviewSlice.reducer;