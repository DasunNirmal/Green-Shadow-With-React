import axios from "axios";
import StaffLogs from "../models/StaffLogs.ts";
import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";

export const initialState : StaffLogs[] = [];

const api = axios.create({
    baseURL: 'http://localhost:3000/staff-logs'
});

export const saveStaffLogs = createAsyncThunk(
    'staffLogs/saveStaffLogs',
    async (staffLogs: FormData) => {
        const token = localStorage.getItem('jwt_token');
        try {
            const response = await api.post('/add', staffLogs, {
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

export const deleteStaffLogs = createAsyncThunk(
    'staffLogs/deleteStaffLogs',
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

export const updateStaffLogs = createAsyncThunk(
    'staffLogs/updateStaffLogs',
    async (staffLogs: FormData) => {
        const token = localStorage.getItem('jwt_token');
        try {
            const response = await api.put(`/update/${staffLogs.get('log_code')}`, staffLogs, {
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

export const getStaffLogs = createAsyncThunk(
    'staffLogs/getStaffLogs',
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

export const searchStaffLogs = createAsyncThunk(
    'staffLogs/searchStaffLogs',
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

const StaffLogsSlice = createSlice({
    name: 'staffLogs',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(saveStaffLogs.fulfilled, (state, action) => {
                state.push(action.payload);
            })
            .addCase(saveStaffLogs.rejected, (state, action) => {
                console.error(action.error.message);
            })
            .addCase(saveStaffLogs.pending, (state, action) => {
                console.log('Pending saving staffLogs : ', action.payload);
            });
        builder
            .addCase(deleteStaffLogs.fulfilled, (state, action) => {
                return state.filter(staff => staff.log_code !== action.payload);
            })
            .addCase(deleteStaffLogs.rejected, (state, action) => {
                console.error('Error deleting staffLogs : ',action.payload);
            })
            .addCase(deleteStaffLogs.pending, (state, action) => {
                console.log('Pending deleting staffLogs : ', action.payload);
            });
        builder
            .addCase(updateStaffLogs.fulfilled, (state, action) => {
                state.map((staffLogs) => {
                    if (staffLogs.log_code === action.payload.log_code) {
                    staffLogs.log_code = action.payload.log_code;
                    staffLogs.details = action.payload.details;
                    staffLogs.img = action.payload.img;
                    staffLogs.log_date = action.payload.log_date;
                    staffLogs.first_name = action.payload.first_name;
                    }
                });
            })
            .addCase(updateStaffLogs.rejected, (state, action) => {
                console.error('Error updating staffLogs : ',action.payload);
            })
            .addCase(updateStaffLogs.pending, (state, action) => {
                console.log('Pending updating staffLogs : ', action.payload);
            });
        builder
            .addCase(getStaffLogs.fulfilled, (state, action) => {
                return Array.isArray(action.payload) ? action.payload : [];
            })
            .addCase(getStaffLogs.rejected, (state, action) => {
                console.error(action.error.message);
            })
            .addCase(getStaffLogs.pending, (state, action) => {
                console.log('Pending getting staffLogs : ', action.payload);
            });
        builder
            .addCase(searchStaffLogs.fulfilled, (state, action) => {
                return Array.isArray(action.payload) ? action.payload : [];
            })
            .addCase(searchStaffLogs.rejected, (state, action) => {
                console.error(action.error.message);
            })
            .addCase(searchStaffLogs.pending, (state, action) => {
                console.log('Pending searching staffLogs : ', action.payload);
            });
    }
});

export default StaffLogsSlice.reducer;