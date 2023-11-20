import { PayloadAction, createSlice } from "@reduxjs/toolkit";

const initialState = {
  token: "",
  user: "",//user data
  activationCode: 0//opt code
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    userRegistration: (state, action: PayloadAction<{ token: string, activationCode: number }>) => {
      state.token = action.payload.token;
      state.activationCode = action.payload.activationCode;//this is opt code 
    },
    userLoggedIn: (state, action: PayloadAction<{ accessToken: string, user: string }>) => {
      state.token = action.payload.accessToken;
      state.user = action.payload.user;
    },
    userLoggedOut: (state) => {
      state.token = "";
      state.user = "";
    },
  },
});

export const { userRegistration, userLoggedIn, userLoggedOut } =
  authSlice.actions;

export default authSlice.reducer;