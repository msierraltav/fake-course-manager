import { TCourse } from "@/lib/types";
import { createSlice } from "@reduxjs/toolkit";

export interface TInitialState {
    courseList: TCourse[];
}

export const initialState: TInitialState = {
    courseList: [],
}

export const courseSlice = createSlice({
    name: "courseList",
    initialState,
    reducers: {
        addCourses: (state, action) => {
            state.courseList = [...state.courseList, ...action.payload];
        },
        removeCourse: (state, action) => {
            const courseIndex = state.courseList.findIndex(c => c.id === action.payload.id);
            if (courseIndex >= 0) {
                state.courseList.splice(courseIndex, 1);
            }
        },
        clearCourses: (state) => {
            state.courseList = [];
        },
    }
});

export const { addCourses, removeCourse, clearCourses } = courseSlice.actions;

export default courseSlice.reducer;
