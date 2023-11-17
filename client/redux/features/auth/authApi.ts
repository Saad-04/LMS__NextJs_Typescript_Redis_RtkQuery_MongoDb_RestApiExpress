import { apiSlice } from '../api/apiSlice';
import { userLoggedIn, userRegistration } from './authSlice';


type RegistrationResponse = {
  message: string;
  activationToken: string;
  activationCode: number;
};


type RegistrationData = {};

export const authApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    // endpoints here
    register: builder.mutation<RegistrationResponse, RegistrationData>({
      query: (data) => ({
        url: "registerUser",
        method: "POST",
        body: data,
        credentials: "include" as const,
      }),
      async onQueryStarted(arg, { queryFulfilled, dispatch }) {
        try {
          const result = await queryFulfilled;
          dispatch(
            userRegistration({
              token: result.data.activationToken,
              activationCode: result.data.activationCode,
            })
          );
        } catch (error: any) {
          console.log(error);
        }
      },
    }),

    activation: builder.mutation({
      query: ({ activation_Token, activation_Code }) => ({
        url: 'activateUser',
        method: 'POST',
        body: {
          activation_Token,
          activation_Code,
        },
      }),
    }),
    loggedIn: builder.mutation({
      query: ({ email, password }) => ({
        url: 'loginUser',
        method: 'POST',
        body: {
          email, password
        },
        credentials: "include" as const
      }),
      async onQueryStarted(arg, { queryFulfilled, dispatch }) {
        try {
          const result = await queryFulfilled;
          dispatch(
            userLoggedIn({
              accessToken: result.data.accessToken,
              user: result.data.user,
            })
          );
        } catch (error: any) {
          console.log(error);
        }
      },
    }),
    socialAuth: builder.mutation({
      query: ({ email, name, avatar }) => ({
        url: "socialRegister",
        method: "POST",
        body: {
          email,
          name,
          avatar,
        },
        credentials: "include" as const,
      }),
      async onQueryStarted(arg, { queryFulfilled, dispatch }) {
        try {
          const result = await queryFulfilled;
          dispatch(
            userLoggedIn({
              accessToken: result.data.accessToken,
              user: result.data.user,
            })
          );
        } catch (error: any) {
          console.log(error);
        }
      },
    }),
    loggedOut: builder.mutation({
      query: () => ({
        url: 'logoutUser',
        method: 'GET',

      }),
    }),
  }),

})
/////
export const { useRegisterMutation, useActivationMutation, useSocialAuthMutation, useLoggedInMutation, useLoggedOutMutation } = authApi;
