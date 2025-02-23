import axios from "axios";
import Crops from "../models/Crops.ts";
import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";

export const initialState : Crops[] = [];

const api = axios.create({
    baseURL: 'http://localhost:3000/crops'
});

export const saveCrops = createAsyncThunk(
    'crops/saveCrops',
    async (crops: FormData) => {
        const token = localStorage.getItem('jwt_token');
        try {
            const response = await api.post('/add', crops, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    Authorization: token ? `Bearer ${token}` : "",
                },
            });
            return response.data;
        } catch (error) {
            return console.error(error);
        }
    }
);

export const deleteCrops = createAsyncThunk(
    'crops/deleteCrops',
    async (crop_code: string) => {
        const token = localStorage.getItem('jwt_token');
        try {
            const response = await api.delete(`/delete/${crop_code}`, {
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

export const updateCrops = createAsyncThunk(
    'crops/updateCrops',
    async (crops: FormData) => {
        const token = localStorage.getItem('jwt_token');
        try {
            const response = await api.put(`/update/${crops.get('crop_code')}`, crops, {
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

export const getCrops = createAsyncThunk(
    'crops/getCrops',
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

export const searchCrops = createAsyncThunk(
    'crops/searchCrops',
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

const CropsSlice = createSlice({
    name: 'crops',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(saveCrops.fulfilled, (state, action) => {
                state.push(action.payload);
            })
            .addCase(saveCrops.rejected, (state, action) => {
                console.error(action.error.message);
            })
            .addCase(saveCrops.pending, (state, action) => {
                console.log('Pending saving crop : ', action.payload);
            });
        builder
            .addCase(deleteCrops.fulfilled, (state, action) => {
                return state.filter(crop => crop.crop_code !== action.payload);
            })
            .addCase(deleteCrops.rejected, (state, action) => {
                console.error('Error deleting crops : ',action.payload);
            })
            .addCase(deleteCrops.pending, (state, action) => {
                console.log('Pending deleting crops : ', action.payload);
            });
        builder
            .addCase(updateCrops.fulfilled, (state, action) => {
                state.map((crops) => {
                    if (crops.crop_code === action.payload.crop_code) {
                        crops.category = action.payload.category;
                        crops.common_name = action.payload.common_name;
                        crops.img = action.payload.img;
                        crops.scientific_name = action.payload.scientific_name;
                        crops.season = action.payload.season;
                        crops.field_code = action.payload.field_code;
                    }
                });
            })
            .addCase(updateCrops.rejected, (state, action) => {
                console.error('Error updating crops : ',action.payload);
            })
            .addCase(updateCrops.pending, (state, action) => {
                console.log('Pending updating crops : ', action.payload);
        });
        builder
            .addCase(getCrops.fulfilled, (state, action) => {
                return Array.isArray(action.payload) ? action.payload : [];
            })
            .addCase(getCrops.rejected, (state, action) => {
                console.error('Error getting crops : ',action.payload);
            })
            .addCase(getCrops.pending, (state, action) => {
                console.log('Pending getting crops : ', action.payload);
            });
        builder
            .addCase(searchCrops.fulfilled, (state, action) => {
                return Array.isArray(action.payload) ? action.payload : [];
            })
            .addCase(searchCrops.rejected, (state, action) => {
                console.error('Error searching crops : ',action.payload);
            })
            .addCase(searchCrops.pending, (state, action) => {
                console.log('Pending searching crops : ', action.payload);
            });
    }
});

export default CropsSlice.reducer;