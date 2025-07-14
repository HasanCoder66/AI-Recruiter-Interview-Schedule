// import { configureStore } from "@reduxjs/toolkit";
// import authReducer from "./Slices/authSlices.js";

// export const store = configureStore({
//   reducer: {
//     auth: authReducer,
//   },
// });






// src/redux/store.js
import { configureStore, combineReducers } from "@reduxjs/toolkit";
import authReducer from "./Slices/authSlices";
import storage from "redux-persist/lib/storage";
import { persistReducer, persistStore } from "redux-persist";

// Redux thunk (optional, already included in defaultMiddleware)
import { thunk } from "redux-thunk";

const persistConfig = {
  key: "root",
  storage,
};

const rootReducer = combineReducers({
  auth: authReducer,
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