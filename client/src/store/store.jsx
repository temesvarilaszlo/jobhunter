import {authApiSlice} from "./authApiSlice.jsx";
import { configureStore } from "@reduxjs/toolkit";
import {authSlice} from "./authSlice.jsx";
import { jobApiSlice } from "./jobApiSlice.jsx";
import { experienceApiSlice } from "./experienceApiSlice.jsx";

export const store = configureStore({
  reducer: {
    [authSlice.name]: authSlice.reducer,
    [authApiSlice.reducerPath]: authApiSlice.reducer,
    [jobApiSlice.reducerPath]: jobApiSlice.reducer,
    [experienceApiSlice.reducerPath]: experienceApiSlice.reducer,
  },

  middleware: (getDefaultMiddleware) => (
    getDefaultMiddleware().concat(authApiSlice.middleware).concat(jobApiSlice.middleware).concat(experienceApiSlice.middleware)
)
})