// import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

// const storedUser = localStorage.getItem("user");

// const initialState = {
//   user: storedUser ? JSON.parse(storedUser) : null,
//   loading: false,
//   error: null,
// };

// export const login = createAsyncThunk(
  "auth/login",
//   async ({ username, password }, { rejectWithValue }) => {
//     try {
//       const user = {
//         token: "new-token",
//         role: "DRIVER",
//       };
//       localStorage.setItem("user", JSON.stringify(user));
//       return user;
//     } catch (error) {
//       return rejectWithValue(error.message);
//     }
//   }
// );

// const authSlice = createSlice({
//   name: "auth",
//   initialState,
//   reducers: {
//     logout: (state) => {
//       state.user = null;
//       localStorage.removeItem("user");
//     },
//   },
//   extraReducers: (builder) => {
//     builder
//       .addCase(login.pending, (state) => {
//         state.loading = true;
//         state.error = null;
//       })
//       .addCase(login.fulfilled, (state, action) => {
//         state.loading = false;
//         state.user = action.payload;
//       })
//       .addCase(login.rejected, (state, action) => {
//         state.loading = false;
//         state.error = action.error.message;
//       });
//   },
// });

// export const { logout } = authSlice.actions;

// const authReducer = authSlice.reducer;

// authReducer.login = login;

// export default authReducer;