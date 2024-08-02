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
        }),
        getCourseContent: builder.query({
            query: (id: any) => ({
                url: `get-course-content/${id}`,
                method: "GET",
                credentials: "include" as const
            })
        }),
        addNewQuestion: builder.mutation({
            query: ({ question, courseId, contentId }) => ({
                url: "add-question",
                method: "PUT",
                body: { question, courseId, contentId },
                credentials: "include" as const
            })
        }),
        addNewAnswer: builder.mutation({
            query: ({ answer, courseId, contentId, questionId }) => ({
                url: "add-answer",
                method: "PUT",
                body: { answer, courseId, contentId, questionId },
                credentials: "include" as const
            })
        }),
        addReview: builder.mutation({
            query: ({ review, courseId, rating }) => ({
                url: `add-review/${courseId}`,
                method: "PUT",
                body: { review, rating },
                credentials: "include" as const
            })
        }),
        addReplyToReview: builder.mutation({
            query: ({ courseId, reviewId, comment }) => ({
                url: `add-review-reply`,
                method: "PUT",
                body: { courseId, reviewId, comment },
                credentials: "include" as const
            })
        })
    })
})
export const { useCreateCourseMutation, useAddReplyToReviewMutation, useAddReviewMutation, useAddNewAnswerMutation, useAddNewQuestionMutation, useGetCourseContentQuery, useGetCourseDetailsQuery, useGetAllCoursesQuery, useDeleteCourseMutation, useEditCourseMutation, useGetUsersAllCoursesQuery } = courseApi