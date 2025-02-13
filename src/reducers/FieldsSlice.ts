import {Fields} from "../models/Fields.ts";
import axios from "axios";
import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";

export const initialState : Fields[] = [];

const api = axios.create({
   baseURL: 'http://localhost:3000/field'
});

export const saveFields = createAsyncThunk(
    'fields/saveFields',
    async (fields: FormData) => {
        try {
            const response = await api.post('/add', fields,{
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

const FieldsSlice = createSlice({
    name: 'fields',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(saveFields.fulfilled, (state, action) => {
            state.push(action.payload);
            })
            .addCase(saveFields.rejected, (state, action) => {
                console.error(action.error.message);
            })
            .addCase(saveFields.pending, (state, action) => {
                console.log('Pending saving filed : ', action.payload);
            });
    }
});

export default FieldsSlice.reducer;