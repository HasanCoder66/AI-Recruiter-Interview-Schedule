// src/redux/slices/authSlice.js
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: null, // will store user object when logged in
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login: (state, action) => {
      state.user = action.payload; // user = { name, email, uid, avatar }
    },
    logout: (state) => {
      state.user = null;
    },
  },
});

export const { login, logout } = authSlice.actions;
export default authSlice.reducer;