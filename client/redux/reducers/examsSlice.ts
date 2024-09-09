import { createSlice } from '@reduxjs/toolkit';
import { addExam, getExams, updateExam, getExamInfo, deleteExam } from '@/services/exams.service';

interface ExamState {
    exam: null | object;
    exams: null | object[];
    loading: boolean;
    error: null | string;
}

const initialState: ExamState = {
    exam: null,
    exams: [],
    loading: false,
    error: null,
};

const examSlice = createSlice({
    name: 'exam',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(addExam.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(addExam.fulfilled, (state, action) => {
                state.loading = false;
                state.exams?.push(action.payload);
            })
            .addCase(addExam.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message || 'Failed to add exam';
            })
            .addCase(getExams.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(getExams.fulfilled, (state, action) => {
                state.loading = false;
                state.exams = action.payload;
            })
            .addCase(getExams.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message || 'Failed to fetch exams';
            })
            .addCase(updateExam.fulfilled, (state, action) => {
                if (state.exams) {
                    state.loading = false;
                    state.exams = state.exams.map((exam: any) =>
                        exam.id === action.payload.id ? action.payload : exam
                    );
                }
            })
            .addCase(getExamInfo.fulfilled, (state, action) => {
                state.loading = false;
                state.exam = action.payload;
            })
            .addCase(deleteExam.fulfilled, (state, action) => {
                if (state.exams) {
                    state.exams = state.exams.filter((exam: any) => exam.id !== action.payload);
                }
            });
    },
});

export default examSlice.reducer;
