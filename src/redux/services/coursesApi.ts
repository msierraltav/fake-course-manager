import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"
import {TCourse} from "@/lib/types";
import { UUID } from "crypto";

export const  coursesApi = createApi({
    reducerPath: 'coursesApi',
    baseQuery: fetchBaseQuery({
        baseUrl: 'http://localhost:5020/api'
    }),
    endpoints: (builder) => ({

        getAllCourses: builder.query<TCourse[], {q:string}>({
            query: ({q}) => `/Courses/GetAll${q.length > 3 ? `?q=${q}` : ''}`
        }),

        getCourseById: builder.query<TCourse, { id: UUID }>({
            query: ({id}) => `/courses/getbyid?id=${id}`
        }),
        insertNew: builder.mutation<TCourse, Partial<TCourse>>({
            query: (newCourse) => ({url:`/courses/addcourserecord`, method:'POST', body: newCourse})
        }),
        deleteCourse : builder.mutation<void, Partial<{id: UUID}>>({
            query: ({id}) => ({
                url: `http://localhost:5020/api/Courses/${id}`,
                method: 'DELETE'
            })
        })
    }),
});

export const {
    useGetAllCoursesQuery,
    useGetCourseByIdQuery,
    useInsertNewMutation,
    useDeleteCourseMutation,

} = coursesApi

