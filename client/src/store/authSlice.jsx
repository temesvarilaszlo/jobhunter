import {createSlice} from "@reduxjs/toolkit";
import {authApiSlice} from "./authApiSlice.jsx";

export const authSlice = createSlice({
    name: "auth",
    initialState: {
        user: null,
        token: null,
        role: null,
    },
    reducers: {
        login(state, {payload}) {
            state.user = payload.user;
            state.token = payload.token;
            state.role = payload.role;
            console.log(payload);
            console.log(state.user);
        },
        logout(state) {
            state.user = null;
            state.token = null;
            state.role = null;
        }
    },
    extraReducers: (builder) => {
        builder.addMatcher(authApiSlice.endpoints.login.matchFulfilled, (state, {payload}) => {
            state.user = payload.user;
            state.token = payload.token;
            state.role = payload.role;
        })
    }
})

export const { login, logout} = authSlice.actions;