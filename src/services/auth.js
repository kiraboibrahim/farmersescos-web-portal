import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const authApi = createApi({
  reducerPath: "authApi",
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.REACT_APP_API_BASE_URL,
  }),
  endpoints: (builder) => ({
    signin: builder.mutation({
      query: (credentials) => ({
        url: "/auth/signin",
        method: "POST",
        body: credentials,
      }),
      transformErrorResponse: (response, meta, arg) => response.data,
    }),
  }),
});

const TOKEN_KEY = "token";
const USER_KEY = "user";

export function saveAuth({ user, token }) {
  sessionStorage.setItem(TOKEN_KEY, token);
  sessionStorage.setItem(USER_KEY, JSON.stringify(user));
}

export function getAuth() {
  return {
    token: sessionStorage.getItem(TOKEN_KEY),
    user: JSON.parse(sessionStorage.getItem(USER_KEY)),
  };
}

export function removeAuth() {
  sessionStorage.setItem(TOKEN_KEY, null);
  sessionStorage.setItem(USER_KEY, null);
}
export const { useSigninMutation } = authApi;
