import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const farmerApi = createApi({
  reducerPath: "farmerApi",
  baseQuery: fetchBaseQuery({ baseUrl: process.env.REACT_APP_API_BASE_URL }),
  endpoints: (builder) => ({
    getFarmers: builder.query({
      query: () => "farmers",
    }),
    getFarmerById: builder.query({
      query: (farmerId) => `farmers/${farmerId}`,
    }),
  }),
});

export const { useGetFarmersQuery, useGetFarmerByIdQuery } = farmerApi;
