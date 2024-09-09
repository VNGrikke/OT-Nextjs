import { configureStore } from '@reduxjs/toolkit';
import usersSlice from './reducers/usersSlice'; // Đảm bảo đúng đường dẫn
import coursesSlice from './reducers/coursesSlice';

const store = configureStore({
  reducer: {
    users: usersSlice, // Đây phải là reducer của người dùng
    courses: coursesSlice, // Đây phải là reducer của khóa học
  },
});

export default store;
