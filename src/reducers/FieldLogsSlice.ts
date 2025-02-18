import axios from "axios";
import FieldLogs from "../models/FieldLogs.ts";
import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";

export const initialState : FieldLogs[] = [];

const api = axios.create({
    baseURL: 'http://localhost:3000/field-logs'
});

export const saveFieldLogs = createAsyncThunk(
    'fieldLogs/saveFieldLogs',
    async (fieldLogs: FormData) => {
        try {
            const response = await api.post('/add', fieldLogs, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            return response.data;
        } catch (error) {
            return console.error(error);
        }
    }
);

export const deleteFieldLogs = createAsyncThunk(
    'fieldLogs/deleteFieldLogs',
    async (log_code: string) => {
        try {
            const response = await api.delete(`/delete/${log_code}`);
            return response.data;
        } catch (error) {
            return console.error(error);
        }
    }
);

export const updateFieldLogs = createAsyncThunk(
    'fieldLogs/updateFieldLogs',
    async (fieldLogs: FormData) => {
        try {
            const response = await api.put(`/update/${fieldLogs.get('log_code')}`, fieldLogs);
            return response.data;
        } catch (error) {
            return console.error(error);
        }
    }
);

export const getFieldLogs = createAsyncThunk(
    'fieldLogs/getFieldLogs',
    async () => {
        try {
            const response = await api.get('/get');
            return response.data;
        } catch (error) {
            return console.error(error);
        }
    }
);

export const searchFieldLogs = createAsyncThunk(
    'fieldLogs/searchFieldLogs',
    async (searchTerm: string) => {
        try {
            const response = await api.get(`/search/${searchTerm}`);
            return response.data;
        } catch (error) {
            return console.error(error);
        }
    }
);

const FieldLogsSlice = createSlice({
    name: 'fieldLogs',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(saveFieldLogs.fulfilled, (state, action) => {
                state.push(action.payload);
            })
            .addCase(saveFieldLogs.rejected, (state, action) => {
                console.error(action.error.message);
            })
            .addCase(saveFieldLogs.pending, (state, action) => {
                console.log('Pending saving fieldLogs : ', action.payload);
            });
        builder
            .addCase(deleteFieldLogs.fulfilled, (state, action) => {
                return state.filter(field => field.log_code !== action.payload);
            })
            .addCase(deleteFieldLogs.rejected, (state, action) => {
                console.error('Error deleting fieldLogs : ',action.payload);
            })
            .addCase(deleteFieldLogs.pending, (state, action) => {
                console.log('Pending deleting fieldLogs : ', action.payload);
            });
        builder
            .addCase(updateFieldLogs.fulfilled, (state, action) => {
                state.map((fieldLogs) => {
                    if (fieldLogs.log_code === action.payload.log_code) {
                        fieldLogs.log_code = action.payload.log_code;
                        fieldLogs.details = action.payload.details;
                        fieldLogs.img = action.payload.img;
                        fieldLogs.log_date = action.payload.log_date;
                        fieldLogs.field_location = action.payload.field_location;
                    }
                })
            })
            .addCase(updateFieldLogs.rejected, (state, action) => {
                console.error('Error updating fieldLogs : ',action.payload);
            })
            .addCase(updateFieldLogs.pending, (state, action) => {
                console.log('Pending updating fieldLogs : ', action.payload);
            });
        builder
            .addCase(getFieldLogs.fulfilled, (state, action) => {
                return Array.isArray(action.payload) ? action.payload : [];
            })
            .addCase(getFieldLogs.rejected, (state, action) => {
                console.error('Error getting fieldLogs : ',action.payload);
            })
            .addCase(getFieldLogs.pending, (state, action) => {
                console.log('Pending getting fieldLogs : ', action.payload);
        })
        builder
            .addCase(searchFieldLogs.fulfilled, (state, action) => {
                return Array.isArray(action.payload) ? action.payload : [];
            })
            .addCase(searchFieldLogs.rejected, (state, action) => {
                console.error('Error searching fieldLogs : ',action.payload);
            })
            .addCase(searchFieldLogs.pending, (state, action) => {
                console.log('Pending searching fieldLogs : ', action.payload);
            });
    }
});

export default FieldLogsSlice.reducer;