import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import serializeParams from "../utils/serializeParams";

const ESCO_TAG_TYPE = "Esco";

export const escoApi = createApi({
  reducerPath: "escoApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `${process.env.REACT_APP_API_BASE_URL}escos/`,
  }),
  tagTypes: [ESCO_TAG_TYPE],
  endpoints: (builder) => ({
    getEscos: builder.query({
      query: ({ page = 1, search = null }) =>
        `?${serializeParams({ page, search })}`,
      providesTags: (result) => {
        return result?.data
          ? result.data.map(({ id }) => ({ type: ESCO_TAG_TYPE, id }))
          : [ESCO_TAG_TYPE];
      },
    }),
    getEsco: builder.query({
      query: (escoId) => `${escoId}`,
      providesTags: (result, error, escoId) => [
        {
          type: ESCO_TAG_TYPE,
          id: escoId,
        },
      ],
    }),
    getEscoProducts: builder.query({
      query: ({ escoId, page = 1 }) =>
        `${escoId}/products${serializeParams({ page })}`,
    }),
    getEscoOffers: builder.query({
      query: ({ escoId, page = 1 }) =>
        `${escoId}/offers${serializeParams({ page })}`,
    }),
    getEscoInstallations: builder.query({
      query: ({ escoId, page = 1 }) =>
        `${escoId}/installations${serializeParams({ page })}`,
    }),
    updateEsco: builder.mutation({
      query: ({ escoId, ...body }) => ({
        method: "PATCH",
        url: `${escoId}`,
        body,
      }),
      invalidatesTags: (result, error, { escoId }) => [
        {
          type: ESCO_TAG_TYPE,
          id: escoId,
        },
      ],
      transformErrorResponse: (response, meta, arg) => response.data,
    }),
  }),
});

export const {
  useGetEscosQuery,
  useLazyGetEscosQuery,
  useGetEscoQuery,
  useGetEscoProductsQuery,
  useGetEscoOffersQuery,
  useGetEscoInstallationsQuery,
  useUpdateEscoMutation,
} = escoApi;
