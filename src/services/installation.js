import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const installationApi = createApi({
  reducerPath: "installationApi",
  baseQuery: fetchBaseQuery({ baseUrl: process.env.REACT_APP_API_BASE_URL }),
  endpoints: (builder) => ({
    getInstallationById: builder.query({
      query: (installationId) => `installations/${installationId}`,
    }),
  }),
});

export const { useGetInstallationByIdQuery } = installationApi;
