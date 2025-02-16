import axios from "axios";
import Staffs from "../models/Staffs.ts";
import {createAsyncThunk} from "@reduxjs/toolkit";

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