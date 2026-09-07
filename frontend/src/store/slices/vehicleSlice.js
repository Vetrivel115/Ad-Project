import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import vehicleService from '../../services/vehicleService';

const initialState = {
    items: [],
    pagination: {
        currentPage: 0,
        totalPages: 0,
        totalElements: 0,
        pageSize: 10
    },
    loading: false,
    error: null
};

export const fetchVehicles = createAsyncThunk(
    'vehicles/fetchAll',

    async ({ page = 0, size = 10 } = {}, { rejectWithValue }) => {
        try {
            const data = await vehicleService.getAll(page, size);

            return data;
        } catch (error) {

            if (error.response?.status === 401) {
                localStorage.removeItem('token');
                localStorage.removeItem('user');
                localStorage.removeItem('role');
            }

            return rejectWithValue(
                error.response?.data?.message ||
                error.message ||
                'Unable to load vehicles'
            );
        }
    }
);

export const deleteVehicle = createAsyncThunk(
    'vehicles/delete',

    async (id, { rejectWithValue }) => {
        try {
            const response = await vehicleService.delete(id);

            return {
                id,
                message: response
            };
        } catch (error) {
            return rejectWithValue(
                error.response?.data?.message ||
                error.message ||
                'Error deleting vehicle'
            );
        }
    }
);

const vehicleSlice = createSlice({
    name: 'vehicles',

    initialState,

    reducers: {},

    extraReducers: (builder) => {
        builder

            .addCase(fetchVehicles.pending, (state) => {
                state.loading = true;
                state.error = null;
            })

            .addCase(fetchVehicles.fulfilled, (state, action) => {
                state.loading = false;

                const data = action.payload || {};

                state.items = data.content || [];

                state.pagination = {
                    currentPage:
                        data.number !== undefined
                            ? data.number
                            : 0,

                    totalPages:
                        data.totalPages !== undefined
                            ? data.totalPages
                            : 0,

                    totalElements:
                        data.totalElements !== undefined
                            ? data.totalElements
                            : 0,

                    pageSize:
                        data.size !== undefined
                            ? data.size
                            : 10
                };
            })

            .addCase(fetchVehicles.rejected, (state, action) => {
                state.loading = false;

                state.error =
                    action.payload ||
                    action.error.message ||
                    'Unable to load vehicles';
            })

            .addCase(deleteVehicle.fulfilled, (state, action) => {
                state.items = state.items.filter(
                    (vehicle) => vehicle.id !== action.payload.id
                );
            });
    }
});

export default vehicleSlice.reducer;