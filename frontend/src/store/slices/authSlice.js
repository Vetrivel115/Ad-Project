import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import authService from '../../services/authService';

let savedUser = null;

try {
    const storedUser = localStorage.getItem('user');

    if (storedUser) {
        savedUser = JSON.parse(storedUser);
    }
} catch (error) {
    savedUser = null;
}

const initialState = {
    user: savedUser,
    loading: false,
    error: null
};

export const login = createAsyncThunk(
    'auth/login',
    async (credentials, { rejectWithValue }) => {
        try {
            const data = await authService.login(credentials);

            return data;
        } catch (error) {
            return rejectWithValue(
                error.response?.data?.message ||
                error.message ||
                'Login failed'
            );
        }
    }
);

const authSlice = createSlice({
    name: 'auth',

    initialState,

    reducers: {
        logout: (state) => {
            state.user = null;
            state.loading = false;
            state.error = null;

            localStorage.removeItem('user');
            localStorage.removeItem('token');
            localStorage.removeItem('role');
        }
    },

    extraReducers: (builder) => {
        builder

            .addCase(login.pending, (state) => {
                state.loading = true;
                state.error = null;
            })

            .addCase(login.fulfilled, (state, action) => {
                state.loading = false;
                state.error = null;
                state.user = action.payload;
            })

            .addCase(login.rejected, (state, action) => {
                state.loading = false;
                state.error =
                    action.payload ||
                    action.error.message ||
                    'Login failed';
            });
    }
});

export const { logout } = authSlice.actions;

export default authSlice.reducer;