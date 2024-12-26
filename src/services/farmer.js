import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { getAuth } from "./auth";
import serializeParams from "../utils/serializeParams";

const FARMER_TAG_TYPE = "Farmer";

export const farmerApi = createApi({
  reducerPath: "farmerApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `${process.env.REACT_APP_API_BASE_URL}farmers/`,
  }),
  tagTypes: [FARMER_TAG_TYPE],
  endpoints: (builder) => ({
    getFarmers: builder.query({
      query: ({ page = 1, search = null }) =>
        `${serializeParams({ page, search })}`,
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
      query: (farmerId) => `${farmerId}`,
      providesTags: (result, error, farmerId) => [
        {
          type: FARMER_TAG_TYPE,
          id: farmerId,
        },
      ],
    }),
    getFarmerFavoriteProducts: builder.query({
      query: ({ farmerId, page = 1 }) =>
        `${farmerId}/products/favorites${serializeParams({ page })}`,
    }),
    getFarmerOffers: builder.query({
      query: ({ farmerId, page = 1 }) => ({
        url: `${farmerId}/offers${serializeParams({ page })}`,
        headers: {
          Authorization: `Bearer ${getAuth().token}`,
        },
      }),
    }),
    getFarmerInstallations: builder.query({
      query: ({ farmerId, page = 1 }) =>
        `${farmerId}/installations${serializeParams({ page })}`,
    }),
    getFarmerRecommendations: builder.query({
      query: ({ farmerId }) => ({
        url: `${farmerId}/recommendations`,
        headers: {
          Authorization: `Bearer ${getAuth().token}`,
        },
      }),
    }),
    updateFarmer: builder.mutation({
      query: ({ farmerId, ...body }) => ({
        method: "PATCH",
        url: `${farmerId}`,
        body,
        headers: {
          Authorization: `Bearer ${getAuth().token}`,
        },
      }),
      invalidatesTags: (result, error, { farmerId }) => [
        {
          type: FARMER_TAG_TYPE,
          id: farmerId,
        },
      ],
      transformErrorResponse: (response, meta, arg) => response.data,
    }),
    deleteFarmer: builder.mutation({
      query: (farmerId) => ({
        method: "DELETE",
        url: `${farmerId}`,
        headers: {
          Authorization: `Bearer ${getAuth().token}`,
        },
      }),
      invalidatesTags: (result, error, farmerId) => [
        {
          type: FARMER_TAG_TYPE,
          id: farmerId,
        },
      ],
      transformErrorResponse: (response, meta, arg) => response.data,
    }),
    createFarmer: builder.mutation({
      query: (body) => ({
        url: "",
        method: "POST",
        body,
        headers: {
          Authorization: `Bearer ${getAuth().token}`,
        },
      }),
      invalidatesTags: [FARMER_TAG_TYPE],
      transformErrorResponse: (response, meta, arg) => response.data,
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
  useUpdateFarmerMutation,
  useCreateFarmerMutation,
  useDeleteFarmerMutation,
} = farmerApi;
