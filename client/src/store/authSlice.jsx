import { createSlice } from "@reduxjs/toolkit";
import { authApiSlice } from "./authApiSlice.jsx";

const loadState = () => {
    try {
        const serializedState = sessionStorage.getItem('authState');
        if (serializedState === null) {
            return {
                user: null,
                token: null,
                role: null,
            };
        }
        return JSON.parse(serializedState);
    } catch (err) {
        return {
            user: null,
            token: null,
            role: null,
        };
    }
};

const saveState = (state) => {
    const serializedState = JSON.stringify(state);
    sessionStorage.setItem('authState', serializedState);    
};

const initialState = loadState();

export const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        login(state, { payload }) {
            state.user = payload.user;
            state.token = payload.token;
            // state.role = payload.role;
            saveState(state);
        },
        logout(state) {
            state.user = null;
            state.token = null;
            // state.role = null;
            saveState(state);
        }
    },
    extraReducers: (builder) => {
        builder.addMatcher(authApiSlice.endpoints.login.matchFulfilled, (state, { payload }) => {
            state.user = payload.user;
            state.token = payload.token;
            // state.role = payload.role;
        });
        // builder.addMatcher(authApiSlice.endpoints.register.matchFulfilled, (state, { payload }) => {
        //     state.user = payload.user;
        //     state.token = payload.token;
        //     state.role = payload.role;
        //     saveState(state);
        // });
    }
})

export const { login, logout } = authSlice.actions;