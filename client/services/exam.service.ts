import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

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

// Async thunks
export const getExams = createAsyncThunk('exam/getExams', async () => {
    const response = await axios.get('http://localhost:8888/exams');
    return response.data;
});

export const addExam = createAsyncThunk(
    'exam/addExam',
    async (examData: Omit<Exam, 'id'>) => {
        const response = await axios.post('http://localhost:8888/exams', examData);
        return response.data;
    }
);

export const updateExam = createAsyncThunk(
    'exam/updateExam',
    async (updatedExam: Exam) => {
        const response = await axios.put(`http://localhost:8888/exams/${updatedExam.id}`, updatedExam);
        return response.data;
    }
);

export const deleteExam = createAsyncThunk(
    'exam/deleteExam',
    async (examId: number) => {
        await axios.delete(`http://localhost:8888/exams/${examId}`);
        return examId;
    }
);