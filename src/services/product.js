import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import serializeParams from "../utils/serializeParams";
import { getAuth } from "./auth";

const PRODUCT_TAG_TYPE = "Product";

export const productApi = createApi({
  reducerPath: "productApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `${process.env.REACT_APP_API_BASE_URL}products/`,
  }),
  tagTypes: [PRODUCT_TAG_TYPE],
  transformErrorResponse: (response, meta, arg) => response.data,
  endpoints: (builder) => ({
    getProducts: builder.query({
      query: ({ page = 1, search = null }) =>
        `${serializeParams({ page, search })}`,
      providesTags: (result) => {
        return result?.data
          ? result.data.map(({ id }) => ({ type: PRODUCT_TAG_TYPE, id }))
          : [PRODUCT_TAG_TYPE];
      },
    }),
    getProduct: builder.query({
      query: (productId) => `${productId}`,
      providesTags: (result, error, productId) => [
        {
          type: PRODUCT_TAG_TYPE,
          id: productId,
        },
      ],
    }),
    getProductLearningMaterial: builder.query({
      query: (productId) => `${productId}/learning-materials`,
      providesTags: (result, error, productId) => [
        {
          type: PRODUCT_TAG_TYPE,
          id: productId,
        },
      ],
    }),
    promoteProduct: builder.mutation({
      query: ({ productId, ...body }) => ({
        url: `${productId}/promotions`,
        method: "POST",
        body,
        headers: {
          Authorization: `Bearer ${getAuth().token}`,
        },
      }),
      providesTags: (result, error, productId) => [
        {
          type: PRODUCT_TAG_TYPE,
          id: productId,
        },
      ],
    }),
    updateProduct: builder.mutation({
      query: ({ productId, ...body }) => ({
        method: "PATCH",
        url: `${productId}`,
        body,
        headers: {
          Authorization: `Bearer ${getAuth().token}`,
        },
      }),
      invalidatesTags: (result, error, { productId }) => [
        {
          type: PRODUCT_TAG_TYPE,
          id: productId,
        },
      ],
      transformErrorResponse: (response, meta, arg) => response.data,
    }),
    deleteProduct: builder.mutation({
      query: (productId) => ({
        method: "DELETE",
        url: `${productId}`,
        headers: {
          Authorization: `Bearer ${getAuth().token}`,
        },
      }),
      invalidatesTags: (result, error, productId) => [
        {
          type: PRODUCT_TAG_TYPE,
          id: productId,
        },
      ],
      transformErrorResponse: (response, meta, arg) => response.data,
    }),
  }),
});

export const {
  useGetProductsQuery,
  useGetProductLearningMaterialQuery,
  useLazyGetProductsQuery,
  useGetProductQuery,
  useUpdateProductMutation,
  useDeleteProductMutation,
  usePromoteProductMutation,
} = productApi;
