// Import necessary modules
import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// Add a new exam subject
export const addExamSubject = createAsyncThunk(
    "examSubject/addExamSubject",
    async (examData: { title: string; description: string; courseId: number }) => {
        const response = await axios.post("http://localhost:8888/examSubjects", examData);
        return response.data;
    }
);

// Get all exam subjects
export const getExamSubjects = createAsyncThunk('examSubject/getExamSubjects', async () => {
    try {
        const response = await axios.get('http://localhost:8888/examSubjects');
        return response.data;
    } catch (error) {
        throw new Error('Failed to fetch exam subjects');
    }
});

// Update an exam subject
export const updateExamSubject = createAsyncThunk(
    "examSubject/updateExamSubject",
    async (updatedExam: { id: number; title: string; description: string; courseId: number }) => {
        const response = await axios.put(`http://localhost:8888/examSubjects/${updatedExam.id}`, updatedExam);
        return response.data;
    }
);

// Get a single exam subject's info
export const getExamSubjectInfo = createAsyncThunk(
    "examSubject/getExamSubjectInfo",
    async (examId: number) => {
        const response = await axios.get<any>(`http://localhost:8888/examSubjects/${examId}`);
        return response.data;
    }
);

// Delete an exam subject
export const deleteExamSubject = createAsyncThunk(
    "examSubject/deleteExamSubject",
    async (examId: number) => {
        await axios.delete(`http://localhost:8888/examSubjects/${examId}`);
        return examId; // Return examId for handling in the reducer
    }
);
