import { configureStore } from '@reduxjs/toolkit';
import authSlice from './store/slices/authSlice';
import vehicleReducer from './store/slices/vehicleSlice';

export const store = configureStore({
    reducer: {
        auth: authSlice.reducer,
        vehicle: vehicleReducer
    }
});