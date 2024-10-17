import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { getAuth } from "./auth";
import serializeParams from "../utils/serializeParams";

const FARMER_TAG_TYPE = "Farmer";

export const farmerApi = createApi({
  reducerPath: "farmerApi",
  baseQuery: fetchBaseQuery({ baseUrl: process.env.REACT_APP_API_BASE_URL }),
  tagTypes: [FARMER_TAG_TYPE],
  endpoints: (builder) => ({
    getFarmers: builder.query({
      query: ({ page = 1, search = null }) =>
        `farmers${serializeParams({ page, search })}`,
      providesTags: (result) => {
        return result?.data
          ? result.data.map(({ id }) => ({
              type: FARMER_TAG_TYPE,
              id,
            }))
          : [FARMER_TAG_TYPE];
      },
    }),
    getFarmer: builder.query({
      query: (farmerId) => `farmers/${farmerId}`,
      providesTags: (result, error, farmerId) => [
        {
          type: FARMER_TAG_TYPE,
          id: farmerId,
        },
      ],
    }),
    getFarmerFavoriteProducts: builder.query({
      query: ({ farmerId, page = 1 }) =>
        `farmers/${farmerId}/products/favorites${serializeParams({ page })}`,
    }),
    getFarmerOffers: builder.query({
      query: ({ farmerId, page = 1 }) =>
        `farmers/${farmerId}/offers${serializeParams({ page })}`,
    }),
    getFarmerInstallations: builder.query({
      query: ({ farmerId, page = 1 }) =>
        `farmers/${farmerId}/installations${serializeParams({ page })}`,
    }),
    getFarmerRecommendations: builder.query({
      query: ({ farmerId }) => ({
        url: `farmers/${farmerId}/recommendations`,
        headers: {
          Authorization: `Bearer ${getAuth().token}`,
        },
      }),
    }),
  }),
});

export const {
  useGetFarmersQuery,
  useGetFarmerQuery,
  useLazyGetFarmersQuery,
  useGetFarmerFavoriteProductsQuery,
  useGetFarmerOffersQuery,
  useGetFarmerInstallationsQuery,
  useGetFarmerRecommendationsQuery,
} = farmerApi;
