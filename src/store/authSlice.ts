import { createSlice } from "@reduxjs/toolkit";
import { Models } from "appwrite";

const initialState: {
  status: boolean;
  userData: Models.User<Models.Preferences> | null;
} = {
  status: false,
  userData: null,
};
export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login: (state, actions) => {
      state.status = true;
      state.userData = actions.payload;
    },
    logout: (state) => {
      state.status = false;
      state.userData = null;
    },
  },
});

export const { login, logout } = authSlice.actions;

export default authSlice.reducer;
