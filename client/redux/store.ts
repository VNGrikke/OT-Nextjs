import { configureStore } from '@reduxjs/toolkit';
import usersSlice from './reducers/usersSlice';
import coursesSlice from './reducers/coursesSlice';
import examsSlice from './reducers/examsSlice';

const store = configureStore({
  reducer: {
    users: usersSlice,
    courses: coursesSlice,
    exams: examsSlice
  },
});

export default store;
