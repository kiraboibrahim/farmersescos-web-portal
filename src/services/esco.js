import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

console.log(process.env.REACT_APP_API_BASE_URL);
export const escoApi = createApi({
  reducerPath: "escoApi",
  baseQuery: fetchBaseQuery({ baseUrl: process.env.REACT_APP_API_BASE_URL }),
  endpoints: (builder) => ({
    getEscos: builder.query({
      query: () => "escos",
    }),
    getEscoById: builder.query({
      query: (escoId) => `escos/${escoId}`,
    }),
  }),
});

export const { useGetEscosQuery, useGetEscoByIdQuery } = escoApi;
