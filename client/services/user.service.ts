import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";


export const getUsers:any = createAsyncThunk<any>(
    "users/getUsers",
    async () => {
        const response = await axios.get("http://localhost:8888/users");
        return response.data;
    }
);

export const updateUser:any = createAsyncThunk<any, any>(
    "users/updateUser",
    async (updatedUser: any) => {
        const response = await axios.put(`http://localhost:8888/users/${updatedUser.id}`, updatedUser);
        return response.data;
    }
);

export const getUserInfo:any = createAsyncThunk<any, any>(
    "users/getUserInfo",
    async (userId: number) => {
        const response = await axios.get<any>(`http://localhost:8888/users/${userId}`);
        return response.data;
    }
);

