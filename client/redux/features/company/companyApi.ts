import { apiSlice } from "../api/apiSlice";

export const companyNameApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    createCompanyName: builder.mutation({
      query: (companyName) => ({
        url: "companyName",
        method: "POST",
        body: companyName,
        credentials: "include" as const,
      }),
    }),
    getCompanyName: builder.query({
      query: () => ({
        url: "getCompanyName",
        method: "GET",
        credentials: "include" as const,
      }),
    }),
    updateCompanyName: builder.mutation({
      query: ({ newName, id }: any) => ({
        url: `updateCompanyName/${id}`,
        method: "PUT",
        body: newName,
        credentials: "include" as const,
      }),
    }),


  }),
});

export const {
  useCreateCompanyNameMutation, useGetCompanyNameQuery, useUpdateCompanyNameMutation

} = companyNameApi;