import { createSlice } from "@reduxjs/toolkit";
import { auth } from "../../configs/altogic";
// Initial state
const initialState = {
  user: auth.getUser(),
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    registerRequest() {},
    registerSuccess(state, action) {
      state.user = action.payload.user;
    },
    registerFailure() {},

    checkUserNameRequest() {},
    checkUserNameSuccess() {},
    checkUserNameFailure() {},

    signInRequest() {},
    signInSuccess(state, action) {
      state.user = action.payload.user;
    },
    signInFailure() {},

    forgotPasswordRequest() {},
    forgotPasswordSuccess() {},
    forgotPasswordFailure() {},

    signInWithTokenRequest() {},
    signInWithTokenSuccess(state, action) {
      state.user = action.payload.user;
    },
    signInWithTokenFailure() {},

    signOutRequest() {},
    signOutSuccess(state) {
      state.user = null;
    },
    signOutFailure() {},
  },
});

export const authActions = authSlice.actions;

export default authSlice.reducer;
