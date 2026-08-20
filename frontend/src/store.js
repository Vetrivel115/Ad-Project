import { configureStore } from '@reduxjs/toolkit';
import authReducer from './components/store/slices/authSlice';
import vehicleReducer from './components/store/slices/vehicleSlice';

export const store = configureStore({
    reducer: {
        auth: authReducer,
        vehicle: vehicleReducer
    }
});