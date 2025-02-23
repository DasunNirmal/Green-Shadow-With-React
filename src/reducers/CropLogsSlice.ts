import axios from "axios";
import CropLogs from "../models/CropLogs.ts";
import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";

export const initialState : CropLogs[] = [];

const api = axios.create({
    baseURL: 'http://localhost:3000/crop-logs'
});

export const saveCropLogs = createAsyncThunk(
    'cropLogs/saveCropLogs',
    async (cropLogs: FormData) => {
        const token = localStorage.getItem('jwt_token');
        try {
            const response = await api.post('/add', cropLogs, {
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

export const deleteCropLogs = createAsyncThunk(
    'cropLogs/deleteCropLogs',
    async (log_code: string) => {
        const token = localStorage.getItem('jwt_token');
        try {
            const response = await api.delete(`/delete/${log_code}`, {
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

export const updateCropLogs = createAsyncThunk(
    'cropLogs/updateCropLogs',
    async (cropLogs: FormData) => {
        const token = localStorage.getItem('jwt_token');
        try {
            const response = await api.put(`/update/${cropLogs.get('log_code')}`, cropLogs, {
                headers: {
                    Authorization: token ? `Bearer ${token}` : "",
                },
            });
            return response.data;
        } catch (error) {
            return console.error(error);
        }
    }
)

export const getCropLogs = createAsyncThunk(
    'cropLogs/getCropLogs',
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

export const searchCropLogs = createAsyncThunk(
    'cropLogs/searchCropLogs',
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

const CropLogsSlice = createSlice({
    name: 'cropLogs',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(saveCropLogs.fulfilled, (state, action) => {
                state.push(action.payload);
            })
            .addCase(saveCropLogs.rejected, (state, action) => {
                console.error(action.error.message);
            })
            .addCase(saveCropLogs.pending, (state, action) => {
                console.log('Pending saving cropLogs : ', action.payload);
            });
        builder
            .addCase(deleteCropLogs.fulfilled, (state, action) => {
                return state.filter(crop => crop.log_code !== action.payload);
            })
            .addCase(deleteCropLogs.rejected, (state, action) => {
                console.error('Error deleting cropLogs : ',action.payload);
            })
            .addCase(deleteCropLogs.pending, (state, action) => {
                console.log('Pending deleting cropLogs : ', action.payload);
            });
        builder
            .addCase(updateCropLogs.fulfilled, (state, action) => {
                state.map((cropLogs) => {
                    if (cropLogs.log_code === action.payload.log_code) {
                        cropLogs.log_code = action.payload.log_code;
                        cropLogs.details = action.payload.details;
                        cropLogs.img = action.payload.img;
                        cropLogs.log_date = action.payload.log_date;
                        cropLogs.crop_name = action.payload.crop_name;
                        cropLogs.crop_code = action.payload.crop_code;
                    }
                });
            })
            .addCase(updateCropLogs.rejected, (state, action) => {
                console.error(action.error.message);
            })
            .addCase(updateCropLogs.pending, (state, action) => {
                console.log('Pending updating cropLogs : ', action.payload);
            });
        builder
            .addCase(getCropLogs.fulfilled, (state, action) => {
                return Array.isArray(action.payload) ? action.payload : [];
            })
            .addCase(getCropLogs.rejected, (state, action) => {
                console.error(action.error.message);
            })
            .addCase(getCropLogs.pending, (state, action) => {
                console.log('Pending getting cropLogs : ', action.payload);
            });
        builder
            .addCase(searchCropLogs.fulfilled, (state, action) => {
                return Array.isArray(action.payload) ? action.payload : [];
            })
            .addCase(searchCropLogs.rejected, (state, action) => {
                console.error(action.error.message);
            })
            .addCase(searchCropLogs.pending, (state, action) => {
                console.log('Pending searching cropLogs : ', action.payload);
            });
    }
});

export default CropLogsSlice.reducer;