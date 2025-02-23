import axios from "axios";
import Vehicles from "../models/Vehicle.ts";
import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";

export const initialState : Vehicles[] = [];

const api = axios.create({
    baseURL: 'http://localhost:3000/vehicle'
});

export const saveVehicles = createAsyncThunk(
    'vehicles/saveVehicles',
    async (vehicles: Vehicles) => {
        const token = localStorage.getItem('jwt_token');
        try {
            const response = await api.post('/add', vehicles, {
                headers: {
                    Authorization: token ? `Bearer ${token}` : "",
                },
            });
            return response.data;
        } catch (error) {
            return console.error(error);
        }
    }
);

export const deleteVehicles = createAsyncThunk(
    'vehicles/deleteVehicles',
    async (vehicle_code: string) => {
        const token = localStorage.getItem('jwt_token');
        try {
            const response = await api.delete(`/delete/${vehicle_code}`, {
                headers: {
                    Authorization: token ? `Bearer ${token}` : "",
                },
            });
            return response.data;
        } catch (error) {
            return console.error(error);
        }
    }
);

export const updateVehicles = createAsyncThunk(
    'vehicles/updateVehicles',
    async (vehicles: Vehicles) => {
        const token = localStorage.getItem('jwt_token');
        try {
            const response = await api.put(`/update/${vehicles.vehicle_code}`, vehicles, {
                headers: {
                    Authorization: token ? `Bearer ${token}` : "",
                },
            });
            return response.data;
        } catch (error) {
            return console.error(error);
        }
    }
);

export const getVehicles = createAsyncThunk(
    'vehicles/getVehicles',
    async () => {
        const token = localStorage.getItem('jwt_token');
        try {
            const response = await api.get('/get', {
                headers: {
                    Authorization: token ? `Bearer ${token}` : "",
                },
            });
            return response.data;
        } catch (error) {
            return console.error(error);
        }
    }
);

export const searchVehicles = createAsyncThunk(
    'vehicles/searchVehicles',
    async (searchTerm: string) => {
        const token = localStorage.getItem('jwt_token');
        try {
            const response = await api.get(`/search/${searchTerm}`, {
                headers: {
                    Authorization: token ? `Bearer ${token}` : "",
                },
            });
            return response.data;
        } catch (error) {
            return console.error(error);
        }
    }
);

const VehiclesSlice = createSlice({
    name: 'vehicles',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(saveVehicles.fulfilled, (state, action) => {
                state.push(action.payload);
            })
            .addCase(saveVehicles.rejected, (state, action) => {
                console.error(action.error.message);
            })
            .addCase(saveVehicles.pending, (state, action) => {
                console.log('Pending saving vehicle : ', action.payload);
            });
        builder
            .addCase(deleteVehicles.fulfilled, (state, action) => {
                return state.filter(vehicle => vehicle.vehicle_code !== action.payload);
            })
            .addCase(deleteVehicles.rejected, (state, action) => {
                console.error(action.error.message);
            })
            .addCase(deleteVehicles.pending, (state, action) => {
                console.log('Pending deleting vehicle : ', action.payload);
            });
        builder
            .addCase(updateVehicles.fulfilled, (state, action) => {
                state.map((vehicle) => {
                    if (vehicle.vehicle_code === action.payload.vehicle_code) {
                        vehicle.vehicle_code = action.payload.vehicle_code;
                        vehicle.email = action.payload.email;
                        vehicle.first_name = action.payload.first_name;
                        vehicle.fuel_type = action.payload.fuel_type;
                        vehicle.license_plate = action.payload.license_plate;
                        vehicle.phone_no = action.payload.phone_no;
                        vehicle.remarks = action.payload.remarks;
                        vehicle.role = action.payload.role;
                        vehicle.status = action.payload.status;
                        vehicle.vehicle_category = action.payload.vehicle_category;
                        vehicle.staff_id = action.payload.staff_id;
                    }
                });
            })
            .addCase(updateVehicles.rejected, (state, action) => {
                console.error(action.error.message);
            })
            .addCase(updateVehicles.pending, (state, action) => {
                console.log('Pending updating vehicle : ', action.payload);
            });
        builder
            .addCase(getVehicles.fulfilled, (state, action) => {
                return Array.isArray(action.payload) ? action.payload : [];
            })
            .addCase(getVehicles.rejected, (state, action) => {
                console.error(action.error.message);
            })
            .addCase(getVehicles.pending, (state, action) => {
                console.log('Pending getting vehicle : ', action.payload);
            });
        builder
            .addCase(searchVehicles.fulfilled, (state, action) => {
                return Array.isArray(action.payload) ? action.payload : [];
            })
            .addCase(searchVehicles.rejected, (state, action) => {
                console.error(action.error.message);
            })
            .addCase(searchVehicles.pending, (state, action) => {
                console.log('Pending searching vehicle : ', action.payload);
            });
    }
});

export default VehiclesSlice.reducer;