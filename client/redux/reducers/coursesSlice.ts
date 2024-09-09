import { createSlice } from '@reduxjs/toolkit';
import { getCourses, updateCourse, getCourseInfo, addCourse, deleteCourse } from '@/services/courses.service';

interface CourseState {
    course: null | object;
    courses: null | object[];
    loading: boolean;
    error: null | string;
}

const initialState: CourseState = {
    course: null,
    courses: [],
    loading: false,
    error: null,
};

const courseSlice = createSlice({
    name: 'course',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(addCourse.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(addCourse.fulfilled, (state, action) => {
                state.loading = false;
                state.course = action.payload;
            })
            .addCase(addCourse.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            })
            .addCase(getCourses.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(getCourses.fulfilled, (state, action) => {
                state.loading = false;
                state.courses = action.payload;
            })
            .addCase(getCourses.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            })
            .addCase(updateCourse.fulfilled, (state, action) => {
                if (state.courses) {
                    state.loading = false;
                    state.courses = state.courses.map((course: any) =>
                        course.id === action.payload.id ? action.payload : course
                    );
                }
            })
            .addCase(getCourseInfo.fulfilled, (state, action) => {
                state.loading = false;
                state.course = action.payload;
            })
            .addCase(deleteCourse.fulfilled, (state, action) => {
                if (state.courses) {
                    state.courses = state.courses.filter((course: any) => course.id !== action.payload);
                }
            });
    },
});

export default courseSlice.reducer;
