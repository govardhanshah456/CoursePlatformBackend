import { apiSlice } from "../api/apiSlice";

export const courseApi = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        createCourse: builder.mutation({
            query: (data) => ({
                url: "create-course",
                method: "POST",
                body: { data },
                credentials: "include" as const,
                overrideExisting: true
            })
        }),
        getAllCourses: builder.query({
            query: () => ({
                url: "get-all-courses-full",
                method: "GET",
                credentials: "include" as const
            })
        }),
        deleteCourse: builder.mutation({
            query: (courseId) => ({
                url: `delete-course/${courseId}`,
                method: "DELETE",
                params: {
                    id: courseId
                },
                credentials: "include" as const
            })
        }),
        editCourse: builder.mutation({
            query: ({ courseData, id }) => ({
                url: `edit-course/${id}`,
                method: "PUT",
                body: courseData,
                credentials: "include" as const
            })
        }),
        getUsersAllCourses: builder.query({
            query: () => ({
                url: "get-courses",
                method: "GET",
                credentials: "include" as const
            })
        }),
        getCourseDetails: builder.query({
            query: (id) => ({
                url: `get-course/${id}`,
                method: "GET",
                credentials: "include" as const
            })
        })
    })
})
export const { useCreateCourseMutation, useGetCourseDetailsQuery, useGetAllCoursesQuery, useDeleteCourseMutation, useEditCourseMutation, useGetUsersAllCoursesQuery } = courseApi