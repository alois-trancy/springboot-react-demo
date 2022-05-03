import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"

export interface Student {
  id: number,
  name: string,
  email: string,
  gender: string,
}

export const apiSlice = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({ baseUrl: "api/v1" }),
  tagTypes: ["Student"],
  endpoints: builder => ({
    getStudents: builder.query<Student[], void>({
      query: () => "/student",
      providesTags: ["Student"],
    }),
    addNewStudent: builder.mutation<Student, void>({
      query: student => ({
        url: "/student",
        method: "POST",
        body: student,
      }),
      invalidatesTags: ["Student"],
    }),
    deleteStudent: builder.mutation<Student, number>({
      query: id => ({
        url: `/student/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Student"],
    }),
  }),
});

export const { useGetStudentsQuery, useAddNewStudentMutation, useDeleteStudentMutation } = apiSlice;