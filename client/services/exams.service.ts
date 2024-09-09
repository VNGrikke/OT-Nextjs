// Import necessary modules
import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// Add a new exam
export const addExam = createAsyncThunk(
    "exams/addExam",
    async (examData: { title: string; description: string; courseId: number }) => {
        const response = await axios.post("http://localhost:8888/exams", examData);
        return response.data;
    }
);

// Get all exams
export const getExams = createAsyncThunk('exams/getExams', async () => {
    try {
        const response = await axios.get('http://localhost:8888/exams');
        return response.data;
    } catch (error) {
        throw new Error('Failed to fetch exams');
    }
});

// Update an exam
export const updateExam = createAsyncThunk(
    "exams/updateExam",
    async (updatedExam: { id: number; title: string; description: string; courseId: number }) => {
        const response = await axios.put(`http://localhost:8888/exams/${updatedExam.id}`, updatedExam);
        return response.data;
    }
);

// Get a single exam's info
export const getExamInfo = createAsyncThunk(
    "exams/getExamInfo",
    async (examId: number) => {
        const response = await axios.get<any>(`http://localhost:8888/exams/${examId}`);
        return response.data;
    }
);

// Delete an exam
export const deleteExam = createAsyncThunk(
    "exams/deleteExam",
    async (examId: number) => {
        await axios.delete(`http://localhost:8888/exams/${examId}`);
        return examId; // Return examId for handling in the reducer
    }
);
