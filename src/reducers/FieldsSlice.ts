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

export const deleteFields = createAsyncThunk(
    'fields/deleteFields',
    async (id: string) => {
        try {
            const response = await api.delete(`/delete/${id}`);
            return response.data;
        } catch (error) {
            return console.error(error);
        }
    }
);

export const updateFields = createAsyncThunk(
    'fields/updateFields',
    async (fields: FormData) => {
        try {
            const response = await api.put(`/update/${fields.get('field_code')}`, fields);
            return response.data;
        } catch (error) {
            return console.error(error);
        }
    }
)

export const getFields = createAsyncThunk(
    'fields/getFields',
    async () => {
        try {
            const response = await api.get('/get');
            return response.data;
        } catch (error) {
            return console.error(error);
        }
    }
);

export const searchFields = createAsyncThunk(
    'fields/searchFields',
    async (searchTerm: string) => {
        try {
            const response = await api.get(`/search/${searchTerm}`);
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
        builder
            .addCase(deleteFields.fulfilled, (state, action) => {
                return state.filter(field => field.field_code !== action.payload);
            })
            .addCase(deleteFields.rejected, (state, action) => {
                console.error('Error deleting fields : ',action.payload);
            })
            .addCase(deleteFields.pending, (state, action) => {
                console.log('Pending deleting fields : ', action.payload);
            });
        builder
            .addCase(updateFields.fulfilled, (state, action) => {
                state.map((fields) => {
                    if (fields.field_code === action.payload.field_code) {
                        fields.field_name = action.payload.field_name;
                        fields.field_location = action.payload.field_location;
                        fields.extent_size = action.payload.extent_size;
                        fields.img_01 = action.payload.img_01;
                        fields.img_02 = action.payload.img_02;
                    }
                });
            })
            .addCase(updateFields.rejected, (state, action) => {
                console.error('Error updating fields : ',action.payload);
            })
            .addCase(updateFields.pending, (state, action) => {
                console.log('Pending updating fields : ', action.payload);
        })
        builder
            .addCase(getFields.fulfilled, (state, action) => {
                return Array.isArray(action.payload) ? action.payload : [];
            })
            .addCase(getFields.rejected, (state, action) => {
                console.error('Error getting fields : ',action.payload);
            })
            .addCase(getFields.pending, (state, action) => {
                console.log('Pending getting fields : ', action.payload);
            });
        builder
            .addCase(searchFields.fulfilled, (state, action) => {
                return Array.isArray(action.payload) ? action.payload : [];
            })
            .addCase(searchFields.rejected, (state, action) => {
                console.error('Error searching fields : ',action.payload);
            })
            .addCase(searchFields.pending, (state, action) => {
                console.log('Pending searching fields : ', action.payload);
            });
    }
});

export default FieldsSlice.reducer;