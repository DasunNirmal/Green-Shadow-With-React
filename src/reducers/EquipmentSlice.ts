import axios from "axios";
import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import Equipments from "../models/Equipments.ts";

export const initialState : Equipments[] = [];

const api = axios.create({
    baseURL: 'http://localhost:3000/equipment'
});

export const saveEquipments = createAsyncThunk(
    'equipment/saveEquipment',
    async (equipments: Equipments) => {
        try {
            const response = await api.post('/add', equipments);
            return response.data;
        } catch (error) {
            return console.error(error);
        }
    }
);

export const deleteEquipments = createAsyncThunk(
    'equipment/deleteEquipment',
    async (eq_code: string) => {
        try {
            const response = await api.delete(`/delete/${eq_code}`);
            return response.data;
        } catch (error) {
            return console.error(error);
        }
    }
);

export const updateEquipments = createAsyncThunk(
    'equipment/updateEquipment',
    async (equipments: Equipments) => {
        try {
            const response = await api.put(`/update/${equipments.eq_code}`, equipments);
            return response.data;
        } catch (error) {
            return console.error(error);
        }
    }
);

export const getEquipments = createAsyncThunk(
    'equipment/getEquipment',
    async () => {
        try {
            const response = await api.get('/get');
            return response.data;
        } catch (error) {
            return console.error(error);
        }
    }
);

export const searchEquipments = createAsyncThunk(
    'equipment/searchEquipment',
    async (searchTerm: string) => {
        try {
            const response = await api.get(`/search/${searchTerm}`);
            return response.data;
        } catch (error) {
            return console.error(error);
        }
    }
);

const EquipmentSlice = createSlice({
    name: 'equipments',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(saveEquipments.fulfilled, (state, action) => {
                state.push(action.payload);
            })
            .addCase(saveEquipments.rejected, (state, action) => {
                console.error(action.error.message);
            })
            .addCase(saveEquipments.pending, (state, action) => {
                console.log('Pending saving equipment : ', action.payload);
            });
        builder
            .addCase(deleteEquipments.fulfilled, (state, action) => {
                return state.filter(equipment => equipment.eq_code !== action.payload);
            })
            .addCase(deleteEquipments.rejected, (state, action) => {
                console.error('Error deleting equipment : ',action.payload);
            })
            .addCase(deleteEquipments.pending, (state, action) => {
                console.log('Pending deleting equipment : ', action.payload);
            });
        builder
            .addCase(updateEquipments.fulfilled, (state, action) => {
                state.map((equipments) => {
                    if (equipments.eq_code === action.payload.eq_code) {
                        equipments.eq_code = action.payload.eq_code;
                        equipments.field_location = action.payload.field_location;
                        equipments.field_name = action.payload.field_name;
                        equipments.first_name = action.payload.first_name;
                        equipments.name = action.payload.name;
                        equipments.phone_no = action.payload.phone_no;
                        equipments.role = action.payload.role;
                        equipments.status = action.payload.status;
                        equipments.type = action.payload.type;
                        equipments.field_code = action.payload.field_code;
                    }
                });
            })
            .addCase(updateEquipments.rejected, (state, action) => {
                console.error(action.error.message);
            })
            .addCase(updateEquipments.pending, (state, action) => {
                console.log('Pending updating equipment : ', action.payload);
            });
        builder
            .addCase(getEquipments.fulfilled, (state, action) => {
                return Array.isArray(action.payload) ? action.payload : [];
            })
            .addCase(getEquipments.rejected, (state, action) => {
                console.error(action.error.message);
            })
            .addCase(getEquipments.pending, (state, action) => {
                console.log('Pending getting equipment : ', action.payload);
            });
        builder
            .addCase(searchEquipments.fulfilled, (state, action) => {
                return Array.isArray(action.payload) ? action.payload : [];
            })
            .addCase(searchEquipments.rejected, (state, action) => {
                console.error(action.error.message);
            })
            .addCase(searchEquipments.pending, (state, action) => {
                console.log('Pending searching equipment : ', action.payload);
            });
    }
});

export default EquipmentSlice.reducer