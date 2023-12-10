import { apiSlice } from "../api/apiSlice"


export const userApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    updateAvatar: builder.mutation({
      query: (avatar) => ({
        url: "updateUserPicture",
        method: "PUT",
        body: { avatar },
        credentials: "include" as const,
      }),
    }),
    updateInfo: builder.mutation({
      query: ({ name }) => ({
        url: "updateUserInfo",
        method: "PUT",
        body: { name },
        credentials: "include" as const,
      }),
    }),
    updatePassword: builder.mutation({
      query: ({ oldPassword, newPassword }) => ({
        url: "updateUserPassword",
        method: "PUT",
        body: { oldPassword, newPassword },
        credentials: "include" as const,
      }),
    }),

    getAllUsers: builder.query({
      query: () => ({
        url: "get-admin-allusers",
        method: "GET",
        credentials: "include" as const,
      }),
    }),
    updateUserRole: builder.mutation({
      query: ({ email, role }) => ({
        url: "updateUserRole",
        method: "PUT",
        body: { email, role },
        credentials: "include" as const,
      }),
    }),
    deleteUser: builder.mutation({
      query: (id) => ({
        url: `deleteUserByAdmin/${id}`,
        method: "DELETE",
        credentials: "include" as const,
      }),

    }),
  })
});


export const {
  useDeleteUserMutation, useGetAllUsersQuery, useUpdateAvatarMutation, useUpdateUserRoleMutation, useUpdateInfoMutation, useUpdatePasswordMutation
} = userApi;