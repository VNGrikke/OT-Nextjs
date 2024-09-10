import { createSlice } from '@reduxjs/toolkit';
import { getExams, addExam, deleteExam, updateExam } from '@/services/exam.service';

interface Exam {
    id: number;
    title: string;
    description: string;
    examSubjectId: number;
    duration: number;
}

interface ExamState {
    exams: Exam[];
    loading: boolean;
    error: string | null;
}

const initialState: ExamState = {
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
            .addCase(addExam.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(addExam.fulfilled, (state, action) => {
                state.loading = false;
                state.exams.push(action.payload);
            })
            .addCase(addExam.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message || 'Failed to add exam';
            })
            .addCase(updateExam.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(updateExam.fulfilled, (state, action) => {
                state.loading = false;
                state.exams = state.exams.map((exam) =>
                    exam.id === action.payload.id ? action.payload : exam
                );
            })
            .addCase(updateExam.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message || 'Failed to update exam';
            })
            .addCase(deleteExam.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(deleteExam.fulfilled, (state, action) => {
                state.loading = false;
                state.exams = state.exams.filter((exam) => exam.id !== action.payload);
            })
            .addCase(deleteExam.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message || 'Failed to delete exam';
            });
    },
});

export default examSlice.reducer;
