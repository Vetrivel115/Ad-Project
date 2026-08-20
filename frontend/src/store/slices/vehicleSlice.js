import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    vehicles: []
};

const vehicleSlice = createSlice({
    name: 'vehicle',
    initialState,
    reducers: {
        setVehicles: (state, action) => {
            state.vehicles = action.payload;
        },
        addVehicle: (state, action) => {
            state.vehicles.push(action.payload);
        },
        removeVehicle: (state, action) => {
            state.vehicles = state.vehicles.filter(
                (vehicle) => vehicle.id !== action.payload
            );
        }
    }
});

export const {
    setVehicles,
    addVehicle,
    removeVehicle
} = vehicleSlice.actions;

export default vehicleSlice.reducer;