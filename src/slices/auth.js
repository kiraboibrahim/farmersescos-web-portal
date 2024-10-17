import { createSlice } from "@reduxjs/toolkit";
import { authApi, getAuth } from "../services/auth";
import parseJwt from "../utils/parse-jwt";

const { user, token } = getAuth();

const authSlice = createSlice({
  name: "auth",
  initialState: {
    user,
    token,
  },
  reducers: {
    logout: (state) => {
      state.user = null;
      state.token = null;
    },
  },
  extraReducers: (builder) => {
    builder.addMatcher(
      authApi.endpoints.signin.matchFulfilled,
      (state, { payload }) => {
        state.token = payload.accessToken;
        state.user = parseJwt(payload.accessToken);
      }
    );
  },
});

export default authSlice.reducer;
export const selectCurrentUser = (state) => state.auth.user;
export const { logout } = authSlice.actions;
