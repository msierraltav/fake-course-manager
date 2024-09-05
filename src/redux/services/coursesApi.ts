import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"
import {TCourse} from "@/lib/types";

export const  coursesApi = createApi({
    reducerPath: 'coursesApi',
    baseQuery: fetchBaseQuery({
        baseUrl: 'http://localhost:5020/api'
    }),
    endpoints: (builder) => ({

        getAllCourses: builder.query<TCourse[], void>({
            query: () => `/Courses/GetAll`
        }),

        getCourseById: builder.query<TCourse, { id: number }>({
            query: ({id}) => `/courses/getbyid?id=${id}`
        }),
        insertNew: builder.mutation<TCourse, Partial<TCourse>>({
            query: (newCourse) => ({url:`/courses/addcourserecord`, method:'POST', body: newCourse})
        })
    }),
});

export const {
    useGetAllCoursesQuery,
    useGetCourseByIdQuery,
    useInsertNewMutation,
} = coursesApi

