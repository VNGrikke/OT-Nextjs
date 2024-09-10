import { createSlice } from '@reduxjs/toolkit';
import { addExamSubject, getExamSubjects, updateExamSubject, getExamSubjectInfo, deleteExamSubject } from '@/services/examSubject.service';

interface ExamState {
    exam: null | object;
    examSubjects: null | object[];
    loading: boolean;
    error: null | string;
}

const initialState: ExamState = {
    exam: null,
    examSubjects: [],
    loading: false,
    error: null,
};

const examSubjectSlice = createSlice({
    name: 'examSubject',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(addExamSubject.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(addExamSubject.fulfilled, (state, action) => {
                state.loading = false;
                state.examSubjects?.push(action.payload);
            })
            .addCase(addExamSubject.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message || 'Failed to add exam subject';
            })
            .addCase(getExamSubjects.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(getExamSubjects.fulfilled, (state, action) => {
                state.loading = false;
                state.examSubjects = action.payload;
            })
            .addCase(getExamSubjects.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message || 'Failed to fetch exam subjects';
            })
            .addCase(updateExamSubject.fulfilled, (state, action) => {
                if (state.examSubjects) {
                    state.loading = false;
                    state.examSubjects = state.examSubjects.map((exam: any) =>
                        exam.id === action.payload.id ? action.payload : exam
                    );
                }
            })
            .addCase(getExamSubjectInfo.fulfilled, (state, action) => {
                state.loading = false;
                state.exam = action.payload;
            })
            .addCase(deleteExamSubject.fulfilled, (state, action) => {
                if (state.examSubjects) {
                    state.examSubjects = state.examSubjects.filter((exam: any) => exam.id !== action.payload);
                }
            });
    },
});

export default examSubjectSlice.reducer;
