import {authApiSlice} from "./authApiSlice.jsx";
import { configureStore } from "@reduxjs/toolkit";
import {authSlice} from "./authSlice.jsx";
import { jobApiSlice } from "./jobApiSlice.jsx";

export const store = configureStore({
  reducer: {
    [authSlice.name]: authSlice.reducer,
    [authApiSlice.reducerPath]: authApiSlice.reducer,
    [jobApiSlice.reducerPath]: jobApiSlice.reducer,
  },

  middleware: (getDefaultMiddleware) => (
    getDefaultMiddleware().concat(authApiSlice.middleware).concat(jobApiSlice.middleware)
)
})