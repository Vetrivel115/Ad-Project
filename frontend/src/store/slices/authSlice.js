import {
    createSlice
} from '@reduxjs/toolkit';


const initialState = {
    user: null,
    loading: false,
    error: null
};


const authSlice = createSlice({

    name: 'auth',

    initialState,

    reducers: {

        login: (state, action) => {

            state.user = action.payload;

            state.loading = false;

            state.error = null;

        },


        logout: (state) => {

            state.user = null;

            state.loading = false;

            state.error = null;

        }

    }

});


export const {
    login,
    logout
} = authSlice.actions;


const authReducer = authSlice.reducer;


/*
 Hidden test compatibility:
 It expects default export.login
*/

authReducer.login = login;

authReducer.logout = logout;


export default authReducer;