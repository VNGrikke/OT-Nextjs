import { createSlice } from '@reduxjs/toolkit';
import { getUsers, updateUser, getUserInfo, registerUser, deleteUser } from '@/services/user.service';

interface UserState {
    user: null | object;
    users: null | object[];
    loading: boolean;
    error: null | string;
}

const initialState: UserState = {
    user: null,
    users: [],
    loading: false,
    error: null,
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
            })
            .addCase(getUsers.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(getUsers.fulfilled, (state, action) => {
                state.loading = false;
                state.users = action.payload;
            })
            .addCase(getUsers.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            })
            .addCase(updateUser.fulfilled, (state, action) => {
                if (state.users) {
                    state.loading = false;
                    state.users = state.users.map((user: any) =>
                        user.id === action.payload.id ? action.payload : user
                    );
                }
            })
            .addCase(getUserInfo.fulfilled, (state, action) => {
                state.loading = false;
                state.user = action.payload;
            })
            .addCase(deleteUser.fulfilled, (state, action) => {
                if (state.users) {
                    state.users = state.users.filter((user: any) => user.id !== action.payload);
                }
            });
    },
});

export default userSlice.reducer;
