import { configureStore } from '@reduxjs/toolkit';
import userReducer from './reducers/usersSlice'; // Đảm bảo đúng đường dẫn

const store = configureStore({
  reducer: {
    users: userReducer, // Đây phải là reducer của người dùng
  },
});

export default store;
