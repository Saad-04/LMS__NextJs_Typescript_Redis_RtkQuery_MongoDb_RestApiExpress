import { apiSlice } from "../api/apiSlice";

export const coursesApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    createCourse: builder.mutation({
      query: (data) => ({
        url: "createCourse",
        method: "POST",
        body: data,
        credentials: "include" as const,
      }),
    }),
    getAdminAllCourses: builder.query({
      query: () => ({
        url: "get-admin-allcourses",
        method: "GET",
        credentials: "include" as const,
      }),
    }),
    deleteCourse: builder.mutation({
      query: (id) => ({
        url: `deleteCourseByAdmin/${id}`,
        method: "DELETE",
        credentials: "include" as const,
      }),
    }),
    editCourse: builder.mutation({
      query: ({ id, data }) => ({
        url: `updateCourse/${id}`,
        method: "PUT",
        body: data,
        credentials: "include" as const,
      }),
    }),
    getAllCourses: builder.query({
      query: () => ({
        url: "getAllCourse",
        method: "GET",
        credentials: "include" as const,
      }),
    }),
    getCourseDetails: builder.query({
      query: (id: any) => ({
        url: `getSingleCourse/${id}`,
        method: "GET",
        credentials: "include" as const,
      }),
    }),
    getCourseContent: builder.query({
      query: (id) => ({
        url: `get-course-content/${id}`,
        method: "GET",
        credentials: "include" as const,
      }),
    }),
    addNewQuestion: builder.mutation({
      query: ({ question, courseId, contentId }) => ({
        url: "add-question",
        body: {
          question,
          courseId,
          contentId,
        },
        method: "PUT",
        credentials: "include" as const,
      }),
    }),
    addAnswerInQuestion: builder.mutation({
      query: ({ answer, courseId, contentId, questionId }) => ({
        url: "add-answer",
        body: {
          answer,
          courseId,
          contentId,
          questionId,
        },
        method: "PUT",
        credentials: "include" as const,
      }),
    }),
    addReviewInCourse: builder.mutation({
      query: ({ review, rating, courseId }: any) => ({
        url: `add-review/${courseId}`,
        body: {
          review,
          rating,
        },
        method: "PUT",
        credentials: "include" as const,
      }),
    }),
    addReplyInReview: builder.mutation({
      query: ({ comment, courseId, reviewId }: any) => ({
        url: `add-reply`,
        body: {
          comment, courseId, reviewId
        },
        method: "PUT",
        credentials: "include" as const,
      }),
    }),
  }),
});

export const {
  useCreateCourseMutation,
  useGetAdminAllCoursesQuery,
  useDeleteCourseMutation,
  useEditCourseMutation,
  useGetAllCoursesQuery,
  useGetCourseDetailsQuery,
  useGetCourseContentQuery,
  useAddNewQuestionMutation,
  useAddAnswerInQuestionMutation,
  useAddReviewInCourseMutation,
  useAddReplyInReviewMutation
} = coursesApi;