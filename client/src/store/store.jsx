import {authApiSlice} from "./authApiSlice.jsx";
import { configureStore } from "@reduxjs/toolkit";
import {authSlice} from "./authSlice.jsx";
import { jobApiSlice } from "./jobApiSlice.jsx";
import { experienceApiSlice } from "./experienceApiSlice.jsx";
import { applicantApiSlice } from "./applicantApiSlice.jsx";

export const store = configureStore({
  reducer: {
    [authSlice.name]: authSlice.reducer,
    [authApiSlice.reducerPath]: authApiSlice.reducer,
    [jobApiSlice.reducerPath]: jobApiSlice.reducer,
    [experienceApiSlice.reducerPath]: experienceApiSlice.reducer,
    [applicantApiSlice.reducerPath]: applicantApiSlice.reducer,
  },

  middleware: (getDefaultMiddleware) => (
    getDefaultMiddleware().concat(authApiSlice.middleware)
    .concat(jobApiSlice.middleware)
    .concat(experienceApiSlice.middleware)
    .concat(applicantApiSlice.middleware)
)
})