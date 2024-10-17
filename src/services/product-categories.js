import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const productCategoriesApi = createApi({
  reducerPath: "productCategoriesApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `${process.env.REACT_APP_API_BASE_URL}product-categories/`,
  }),
  transformErrorResponse: (response, meta, arg) => response.data,
  endpoints: (builder) => ({
    getProductsCategories: builder.query({
      query: () => "",
    }),
  }),
});

export const { useLazyGetProductsCategoriesQuery } = productCategoriesApi;
