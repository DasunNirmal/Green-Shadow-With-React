import axios from "axios";
import Staffs from "../models/Staffs.ts";
import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";

export const initialState : Staffs[] = [];

const api = axios.create({
    baseURL: 'http://localhost:3000/staff'
});

export const saveStaffs = createAsyncThunk(
    'staffs/saveStaffs',
    async (staffs: Staffs) => {
        try {
            const response = await api.post('/add', staffs);
            return response.data;
        } catch (error) {
            return console.error(error);
        }
    }
);

export const deleteStaffs = createAsyncThunk(
    'staffs/deleteStaffs',
    async (staff_id: string) => {
        try {
            const response = await api.delete(`/delete/${staff_id}`);
            return response.data;
        } catch (error) {
            return console.error(error);
        }
    }
);

export const updateStaffs = createAsyncThunk(
    'staffs/updateStaffs',
    async (staffs: Staffs) => {
        try {
            const response = await api.put(`/update/${staffs.staff_id}`, staffs);
            return response.data;
        } catch (error) {
            return console.error(error);
        }
    }
);

export const getStaffs = createAsyncThunk(
    'staffs/getStaffs',
    async () => {
        try {
            const response = await api.get('/get');
            return response.data;
        } catch (error) {
            return console.error(error);
        }
    }
);

export const searchStaffs = createAsyncThunk(
    'staffs/searchStaffs',
    async (searchTerm: string) => {
        try {
            const response = await api.get(`/search/${searchTerm}`);
            return response.data;
        } catch (error) {
            return console.error(error);
        }
    }
);

const StaffsSlice = createSlice({
    name: 'staffs',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(saveStaffs.fulfilled, (state, action) => {
                state.push(action.payload);
            })
            .addCase(saveStaffs.rejected, (state, action) => {
                console.error(action.error.message);
            })
            .addCase(saveStaffs.pending, (state, action) => {
                console.log('Pending saving staff : ', action.payload);
            });
        builder
            .addCase(deleteStaffs.fulfilled, (state, action) => {
                return state.filter(staff => staff.staff_id !== action.payload);
            })
            .addCase(deleteStaffs.rejected, (state, action) => {
                console.error('Error deleting staff : ',action.payload);
            })
            .addCase(deleteStaffs.pending, (state, action) => {
                console.log('Pending deleting staff : ', action.payload);
            });
        builder
            .addCase(updateStaffs.fulfilled, (state, action) => {
                state.map((staffs) => {
                    if (staffs.staff_id === action.payload.staff_id) {
                        staffs.staff_id = action.payload.staff_id;
                        staffs.address_01 = action.payload.address_01;
                        staffs.address_02 = action.payload.address_02;
                        staffs.address_03 = action.payload.address_03;
                        staffs.address_04 = action.payload.address_04;
                        staffs.address_05 = action.payload.address_05;
                        staffs.designation = action.payload.designation;
                        staffs.dob = action.payload.dob;
                        staffs.email = action.payload.email;
                        staffs.first_name = action.payload.first_name;
                        staffs.gender = action.payload.gender;
                        staffs.joined_date = action.payload.joined_date;
                        staffs.last_name = action.payload.last_name;
                        staffs.phone_no = action.payload.phone_no;
                        staffs.role = action.payload.role;
                        staffs.field_code = action.payload.field_code;
                    }
                });
            })
            .addCase(updateStaffs.rejected, (state, action) => {
                console.error(action.error.message);
            })
            .addCase(updateStaffs.pending, (state, action) => {
                console.log('Pending updating staff : ', action.payload);
            });
        builder
            .addCase(getStaffs.fulfilled, (state, action) => {
                return Array.isArray(action.payload) ? action.payload : [];
            })
            .addCase(getStaffs.rejected, (state, action) => {
                console.error(action.error.message);
            })
            .addCase(getStaffs.pending, (state, action) => {
                console.log('Pending getting staff : ', action.payload);
            });
        builder
            .addCase(searchStaffs.fulfilled, (state, action) => {
                return Array.isArray(action.payload) ? action.payload : [];
            })
            .addCase(searchStaffs.rejected, (state, action) => {
                console.error(action.error.message);
            })
            .addCase(searchStaffs.pending, (state, action) => {
                console.log('Pending searching staff : ', action.payload);
            });
    }
});

export default StaffsSlice.reducer;