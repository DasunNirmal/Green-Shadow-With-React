import axios from "axios";
import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import User from "../models/User.ts";

export const initialState = {
    jwt_token: null,
    refresh_token : null,
    username: null,
    isAuthenticated: false,
    loading: false,
    error: '',
};

const api = axios.create({
    baseURL: 'http://localhost:3000'
});

export const registerUser = createAsyncThunk(
    'user/registerUser',
    async (user: User) => {
        try {
            const response = await api.post('auth/register', {user}, {withCredentials: true});
            return response.data;
        } catch (error) {
            return console.error(error);
        }
    }
);

export const loginUser = createAsyncThunk(
    'user/loginUser',
    async (user: User) => {
        try {
            const response = await api.post('auth/login', {user}, {withCredentials: true});
            const token = response.data.accessToken;
            if (token) {
                localStorage.setItem('jwt_token', token);
                console.log("Token stored in localStorage:", token);
            }
            return response.data;
        } catch (error) {
            return console.error(error);
        }
    }
);

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {logOutUser(state){
            state.isAuthenticated = false;
        }},
    extraReducers: (builder) => {
        builder
            .addCase(registerUser.fulfilled, (state, action) => {
                console.log('User Registered Successfully');
            })
            .addCase(registerUser.rejected, (state, action) => {
                state.error = action.payload as string;
            })
            .addCase(registerUser.pending, (state, action) => {
                console.log("Pending");
            });
        builder
            .addCase(loginUser.fulfilled, (state, action) => {
                state.jwt_token = action.payload.access_token;
                state.refresh_token = action.payload.refresh_token;
                state.isAuthenticated = true;
            })
            .addCase(loginUser.rejected, (state, action) => {
                state.error = action.payload as string;
                state.isAuthenticated = false;
            })
            .addCase(loginUser.pending, (state, action) => {
                state.isAuthenticated = false;
            });
    }
});

export const {logOutUser} = userSlice.actions;
export default userSlice.reducer;