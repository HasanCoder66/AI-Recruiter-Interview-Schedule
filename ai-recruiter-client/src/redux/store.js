// src/redux/store.js
import { configureStore, combineReducers } from "@reduxjs/toolkit";
import authReducer from "./Slices/authSlices";
import interviewReducer from "./Slices/interviewSlice";
import candidateReducer from "./Slices/candidate";
import storage from "redux-persist/lib/storage";
import { persistReducer, persistStore } from "redux-persist";

const persistConfig = {
  key: "root",
  storage,
};

const rootReducer = combineReducers({
  auth: authReducer,
  interview: interviewReducer, // ✅ Add interview reducer
  candidate: candidateReducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      thunk: true,
      serializableCheck: false,
    }),
});

export const persistor = persistStore(store);