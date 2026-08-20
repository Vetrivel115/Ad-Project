// import { createSlice } from '@reduxjs/toolkit';

// const initialState = {
//     user: null
// };

// const authSlice = createSlice({
//     name: 'auth',
//     initialState,
//     reducers: {
//         login: (state, action) => {
//             state.user = action.payload;
//         },
//         logout: (state) => {
//             state.user = null;
//         }
//     }
// });

// const authReducer = authSlice.reducer;

// authReducer.login = authSlice.actions.login;
// authReducer.logout = authSlice.actions.logout;

// export const login = authSlice.actions.login;
// export const logout = authSlice.actions.logout;

// export default authReducer;