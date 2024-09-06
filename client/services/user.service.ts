import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
// Register a new user
export const registerUser = createAsyncThunk(
    "users/registerUser",
    async (userData: { fullName: string; email: string; password: string; role: number; profilePicture: string; status: number }) => {
        const response = await axios.post("http://localhost:8888/users", userData);
        return response.data;
    }
);


// Get all users
export const getUsers = createAsyncThunk('users/getUsers', async () => {
    try {
        const response = await axios.get('http://localhost:8888/users');
        return response.data;
    } catch (error) {
        throw new Error('Failed to fetch users');
    }
});




// Update a user
export const updateUser = createAsyncThunk(
    "users/updateUser",
    async (updatedUser: any) => {
        const response = await axios.put(`http://localhost:8888/users/${updatedUser.id}`, updatedUser);
        return response.data;
    }
);


// Get a single user's info
export const getUserInfo = createAsyncThunk(
    "users/getUserInfo",
    async (userId: number) => {
        const response = await axios.get<any>(`http://localhost:8888/users/${userId}`);
        return response.data;
    }
);

