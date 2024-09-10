import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// Add a new question
export const addQuestion = createAsyncThunk(
    "questions/addQuestion",
    async (questionData: { content: string; options: string[]; correctOption: number; courseId: number }) => {
        const response = await axios.post("http://localhost:8888/questions", questionData);
        return response.data;
    }
);

// Get all questions
export const getQuestions = createAsyncThunk('questions/getQuestions', async () => {
    try {
        const response = await axios.get('http://localhost:8888/questions');
        return response.data;
    } catch (error) {
        throw new Error('Failed to fetch questions');
    }
});

// Update a question
export const updateQuestion = createAsyncThunk(
    "questions/updateQuestion",
    async (updatedQuestion: any) => {
        const response = await axios.put(`http://localhost:8888/questions/${updatedQuestion.id}`, updatedQuestion);
        return response.data;
    }
);

// Get a single question's info
export const getQuestionInfo = createAsyncThunk(
    "questions/getQuestionInfo",
    async (questionId: number) => {
        const response = await axios.get<any>(`http://localhost:8888/questions/${questionId}`);
        return response.data;
    }
);

// Delete a question
export const deleteQuestion = createAsyncThunk(
    "questions/deleteQuestion",
    async (questionId: number) => {
        await axios.delete(`http://localhost:8888/questions/${questionId}`);
        return questionId; // Return questionId for handling in the reducer
    }
);
