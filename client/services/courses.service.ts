// Import necessary modules
import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// Add a new course
export const addCourse = createAsyncThunk(
    "courses/addCourse",
    async (courseData: { title: string; description: string }) => {
        const response = await axios.post("http://localhost:8888/courses", courseData);
        return response.data;
    }
);

// Get all courses
export const getCourses = createAsyncThunk('courses/getCourses', async () => {
    try {
        const response = await axios.get('http://localhost:8888/courses');
        return response.data;
    } catch (error) {
        throw new Error('Failed to fetch courses');
    }
});

// Update a course
export const updateCourse = createAsyncThunk(
    "courses/updateCourse",
    async (updatedCourse: any) => {
        const response = await axios.put(`http://localhost:8888/courses/${updatedCourse.id}`, updatedCourse);
        return response.data;
    }
);

// Get a single course's info
export const getCourseInfo = createAsyncThunk(
    "courses/getCourseInfo",
    async (courseId: number) => {
        const response = await axios.get<any>(`http://localhost:8888/courses/${courseId}`);
        return response.data;
    }
);

// Delete a course
export const deleteCourse = createAsyncThunk(
    "courses/deleteCourse",
    async (courseId: number) => {
        await axios.delete(`http://localhost:8888/courses/${courseId}`);
        return courseId; // Return courseId for handling in the reducer
    }
);
