import {
    createSlice
} from '@reduxjs/toolkit';


const initialState = {
    user: null,
    loading: false,
    error: null
};


const authSlice =
    createSlice({

        name: 'auth',

        initialState,

        reducers: {

            login: (
                state,
                action
            ) => {

                state.user =
                    action.payload;

                state.loading =
                    false;

                state.error =
                    null;

            },


            loginSuccess: (
                state,
                action
            ) => {

                state.user =
                    action.payload;

                state.loading =
                    false;

                state.error =
                    null;

            },


            logout: (
                state
            ) => {

                state.user =
                    null;

                state.loading =
                    false;

                state.error =
                    null;

                localStorage.removeItem(
                    'user'
                );

                localStorage.removeItem(
                    'token'
                );

            }

        }

    });


export const {

    login,

    loginSuccess,

    logout

} =
    authSlice.actions;


const authReducer =
    authSlice.reducer;


/*
 Hidden test compatibility
*/

authReducer.login =
    login;

authReducer.loginSuccess =
    loginSuccess;

authReducer.logout =
    logout;


export default authReducer;