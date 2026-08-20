import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    user: null
};

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        login: (state, action) => {
            state.user = action.payload;
        },
        logout: (state) => {
            state.user = null;
        }
    },
    extraReducers: (builder) => {
        builder.addCase('auth/login/fulfilled', (state, action) => {
            state.user = action.payload;
        });
    }
});

export const { login, logout } = authSlice.actions;

export default {
    login,
    logout,
    reducer: authSlice.reducer
};