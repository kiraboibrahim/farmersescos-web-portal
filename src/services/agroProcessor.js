import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { getAuth } from "./auth";
import serializeParams from "../utils/serializeParams";

const AGRO_PROCESSOR_TAG_TYPE = "AgroProcessor";

export const agroProcessorApi = createApi({
  reducerPath: "agroProcessorApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `${process.env.REACT_APP_API_BASE_URL}agro-processors/`,
  }),
  tagTypes: [AGRO_PROCESSOR_TAG_TYPE],
  endpoints: (builder) => ({
    getAgroProcessors: builder.query({
      query: ({ page = 1, search = null }) =>
        `${serializeParams({ page, search })}`,
      providesTags: (result) => {
        return result?.data
          ? result.data.map(({ id }) => ({
              type: AGRO_PROCESSOR_TAG_TYPE,
              id,
            }))
          : [AGRO_PROCESSOR_TAG_TYPE];
      },
    }),
    getAgroProcessor: builder.query({
      query: (agroProcessorId) => `${agroProcessorId}`,
      providesTags: (result, error, agroProcessorId) => [
        {
          type: AGRO_PROCESSOR_TAG_TYPE,
          id: agroProcessorId,
        },
      ],
    }),
    getAgroProcessorFavorites: builder.query({
      query: ({ agroProcessorId, page = 1 }) =>
        `${agroProcessorId}/products/favorites${serializeParams({ page })}`,
    }),
    getAgroProcessorOffers: builder.query({
      query: ({ agroProcessorId, page = 1 }) => ({
        url: `${agroProcessorId}/offers${serializeParams({ page })}`,
        headers: {
          Authorization: `Bearer ${getAuth().token}`,
        },
      }),
    }),
    getAgroProcessorInstallations: builder.query({
      query: ({ agroProcessorId, page = 1 }) =>
        `${agroProcessorId}/installations${serializeParams({ page })}`,
    }),
    getAgroProcessorRecommendations: builder.query({
      query: ({ agroProcessorId }) => ({
        url: `${agroProcessorId}/recommendations`,
        headers: {
          Authorization: `Bearer ${getAuth().token}`,
        },
      }),
    }),
    updateAgroProcessor: builder.mutation({
      query: ({ agroProcessorId, ...body }) => ({
        method: "PATCH",
        url: `${agroProcessorId}`,
        body,
        headers: {
          Authorization: `Bearer ${getAuth().token}`,
        },
      }),
      invalidatesTags: (result, error, { agroProcessorId }) => [
        {
          type: AGRO_PROCESSOR_TAG_TYPE,
          id: agroProcessorId,
        },
      ],
      transformErrorResponse: (response, meta, arg) => response.data,
    }),
    deleteAgroProcessor: builder.mutation({
      query: (agroProcessorId) => ({
        method: "DELETE",
        url: `${agroProcessorId}`,
        headers: {
          Authorization: `Bearer ${getAuth().token}`,
        },
      }),
      invalidatesTags: (result, error, agroProcessorId) => [
        {
          type: AGRO_PROCESSOR_TAG_TYPE,
          id: agroProcessorId,
        },
      ],
      transformErrorResponse: (response, meta, arg) => response.data,
    }),
    createAgroProcessor: builder.mutation({
      query: (body) => ({
        url: "",
        method: "POST",
        body,
        headers: {
          Authorization: `Bearer ${getAuth().token}`,
        },
      }),
      invalidatesTags: [AGRO_PROCESSOR_TAG_TYPE],
      transformErrorResponse: (response, meta, arg) => response.data,
    }),
  }),
});

export const {
  useGetAgroProcessorsQuery,
  useGetAgroProcessorQuery,
  useLazyGetAgroProcessorsQuery,
  useGetAgroProcessorFavoritesQuery,
  useGetAgroProcessorOffersQuery,
  useGetAgroProcessorInstallationsQuery,
  useGetAgroProcessorRecommendationsQuery,
  useUpdateAgroProcessorMutation,
  useCreateAgroProcessorMutation,
  useDeleteAgroProcessorMutation,
} = agroProcessorApi;
