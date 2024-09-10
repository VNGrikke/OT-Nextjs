import { configureStore } from '@reduxjs/toolkit';
import usersSlice from './reducers/usersSlice';
import coursesSlice from './reducers/coursesSlice';
import examSubjectSlice from './reducers/examSubjectSlice';
import examSlice from './reducers/examSlice';
import questionBankSlice from './reducers/questionBankSlice';

const store = configureStore({
  reducer: {
    users: usersSlice,
    courses: coursesSlice,
    examSubject: examSubjectSlice,
    exams: examSlice,
    questionBank: questionBankSlice
  },
});

export default store;
