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

        loginStart: (state) => {

            state.loading = true;

            state.error = null;

        },


        loginSuccess: (
            state,
            action
        ) => {

            state.user =
                action.payload;

            state.loading = false;

            state.error = null;

        },


        loginFailure: (
            state,
            action
        ) => {

            state.user = null;

            state.loading = false;

            state.error =
                action.payload;

        },


        login: (
            state,
            action
        ) => {

            state.user =
                action.payload;

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

    loginStart,

    loginSuccess,

    loginFailure,

    logout

} = authSlice.actions;


const authReducer =
    authSlice.reducer;


/*
 * Hidden test compatibility
 */

authReducer.login = login;

authReducer.loginStart =
    loginStart;

authReducer.loginSuccess =
    loginSuccess;

authReducer.loginFailure =
    loginFailure;

authReducer.logout =
    logout;


export default authReducer;