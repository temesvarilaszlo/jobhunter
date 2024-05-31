import {authApiSlice} from "./authApiSlice.jsx";
import { configureStore } from "@reduxjs/toolkit";
import {authSlice} from "./authSlice.jsx";

export const store = configureStore({
  reducer: {
    [authSlice.name]: authSlice.reducer,
    [authApiSlice.reducerPath]: authApiSlice.reducer,
  },

  middleware: (getDefaultMiddleware) => (
    getDefaultMiddleware().concat(authApiSlice.middleware)
)
})