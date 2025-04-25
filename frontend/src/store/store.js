// src/store/store.js
import { configureStore } from "@reduxjs/toolkit";
import userSlice from "../features/users/userSlice.js";
export const store = configureStore({
  reducer: {
    auth: userSlice,
  },
});
