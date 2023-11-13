import { apiSlice } from '../api/apiSlice';
import { userRegistration } from './authSlice';

type RegistrationResponse = {
  //these two things come from response in registration api
  message: string;
  activationToken: string;
};

type RegistrationData = {};

export const authApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    register: builder.mutation<RegistrationResponse, RegistrationData>({
      //this data is from req.body
      query: (data) => ({
        url: 'registerUser',
        method: 'POST',
        body: data, //this data is from req.body
        credentials: 'include' as const,
      }),
      async onQueryStarted(arg, { queryFulfilled, dispatch }) {
        try {
          const result = await queryFulfilled; //this is full response object data {data}

          dispatch(
            userRegistration({
              token: result.data.activationToken, //this come from res.json in register api
            })
          );
        } catch (error: any) {
          console.log(error);
        }
      },
    }),
    activation: builder.mutation({
      query: ({ activation_token, activation_code }) => ({
        url: 'activate-user',
        method: 'POST',
        body: {
          activation_token,
          activation_code,
        },
      }),
    }),
  }),
});
/////
export const { useRegisterMutation, useActivationMutation } = authApi;
