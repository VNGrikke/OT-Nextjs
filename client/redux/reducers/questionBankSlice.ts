import { createSlice } from '@reduxjs/toolkit';
import { getQuestions, updateQuestion, getQuestionInfo, addQuestion, deleteQuestion } from '@/services/questionBank.service';

interface QuestionState {
    question: null | object;
    questions: null | object[];
    loading: boolean;
    error: null | string;
}

const initialState: QuestionState = {
    question: null,
    questions: [],
    loading: false,
    error: null,
};

const questionSlice = createSlice({
    name: 'question',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(addQuestion.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(addQuestion.fulfilled, (state, action) => {
                state.loading = false;
                state.question = action.payload;
            })
            .addCase(addQuestion.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            })
            .addCase(getQuestions.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(getQuestions.fulfilled, (state, action) => {
                state.loading = false;
                state.questions = action.payload;
            })
            .addCase(getQuestions.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            })
            .addCase(updateQuestion.fulfilled, (state, action) => {
                if (state.questions) {
                    state.loading = false;
                    state.questions = state.questions.map((question: any) =>
                        question.id === action.payload.id ? action.payload : question
                    );
                }
            })
            .addCase(getQuestionInfo.fulfilled, (state, action) => {
                state.loading = false;
                state.question = action.payload;
            })
            .addCase(deleteQuestion.fulfilled, (state, action) => {
                if (state.questions) {
                    state.questions = state.questions.filter((question: any) => question.id !== action.payload);
                }
            });
    },
});

export default questionSlice.reducer;
