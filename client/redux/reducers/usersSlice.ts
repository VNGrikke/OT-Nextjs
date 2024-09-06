// redux/userSlice.ts
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import bcrypt from 'bcryptjs';

// Async action để xử lý đăng ký
export const registerUser = createAsyncThunk(
    'user/registerUser',
    async (userData: { fullName: string; email: string; password: string; role: number; profilePicture: string; status: number }, { rejectWithValue }) => {
        try {
            const salt = bcrypt.genSaltSync(10);
            const hashedPassword = bcrypt.hashSync(userData.password, salt);

            // Gửi request đến API
            const response = await axios.post('http://localhost:8888/users', {
                fullName: userData.fullName,
                email: userData.email,
                password: hashedPassword,
                role: userData.role,
                profilePicture: userData.profilePicture,
                status: userData.status
            });

            return response.data;
        } catch (error: any) {
            return rejectWithValue(error.response.data);
        }
    }
);

interface UserState {
    user: null | object;
    loading: boolean;
    error: null | string;
}

const initialState: UserState = {
    user: null,
    loading: false,
    error: null
};

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(registerUser.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(registerUser.fulfilled, (state, action) => {
                state.loading = false;
                state.user = action.payload;
            })
            .addCase(registerUser.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            });
    }
});

export default userSlice.reducer;
