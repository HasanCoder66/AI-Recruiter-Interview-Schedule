import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isDarkMode:
    localStorage.getItem("isDarkMode") != undefined
      ? JSON.parse(localStorage.getItem("isDarkMode"))
      : // : window.matchMedia("(prefers-color-scheme: dark)").matches
        // ? true
        false, //light mode is the default
};

export const uiSlice = createSlice({
  name: "ui",
  initialState,
  reducers: {
    toggleMode: (state) => {
      state.isDarkMode = !state.isDarkMode;
      localStorage.setItem("isDarkMode", state.isDarkMode);
    },
  },
});
export const { toggleMode } = uiSlice.actions;
export default uiSlice.reducer;
