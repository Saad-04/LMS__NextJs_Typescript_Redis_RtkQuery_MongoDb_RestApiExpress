import { apiSlice } from "../api/apiSlice";

export const notificationsApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getAllNotifications: builder.query({
      query: () => ({
        url: "getAllNotifications",
        method: "GET",
        credentials: "include" as const,
      }),
    }),
    updateNotificationStatus: builder.mutation({
      query: (id) => ({
        url: `/updateNotificationStatus/${id}`,
        method: "PUT",
        credentials: "include" as const,
      }),
    }),
  }),
});

export const {
  useGetAllNotificationsQuery,
  useUpdateNotificationStatusMutation,
} = notificationsApi;