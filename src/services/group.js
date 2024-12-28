import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { getAuth } from "./auth";
import serializeParams from "../utils/serializeParams";

const GROUP_TAG_TYPE = "Group";

export const groupApi = createApi({
  reducerPath: "groupApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `${process.env.REACT_APP_API_BASE_URL}groups/`,
  }),
  tagTypes: [GROUP_TAG_TYPE],
  endpoints: (builder) => ({
    getGroups: builder.query({
      query: ({ page = 1, search = null }) =>
        `${serializeParams({ page, search })}`,
      providesTags: (result) => {
        return result?.data
          ? result.data.map(({ id }) => ({
              type: GROUP_TAG_TYPE,
              id,
            }))
          : [GROUP_TAG_TYPE];
      },
    }),
    getGroup: builder.query({
      query: (groupId) => `${groupId}`,
      providesTags: (result, error, groupId) => [
        {
          type: GROUP_TAG_TYPE,
          id: groupId,
        },
      ],
    }),

    deleteGroup: builder.mutation({
      query: (groupId) => ({
        method: "DELETE",
        url: `${groupId}`,
        headers: {
          Authorization: `Bearer ${getAuth().token}`,
        },
      }),
      invalidatesTags: (result, error, groupId) => [
        {
          type: GROUP_TAG_TYPE,
          id: groupId,
        },
      ],
      transformErrorResponse: (response, meta, arg) => response.data,
    }),
    createGroup: builder.mutation({
      query: (body) => ({
        url: "",
        method: "POST",
        body,
        headers: {
          Authorization: `Bearer ${getAuth().token}`,
        },
      }),
      invalidatesTags: [GROUP_TAG_TYPE],
      transformErrorResponse: (response, meta, arg) => response.data,
    }),
  }),
});

export const {
  useGetGroupsQuery,
  useLazyGetGroupsQuery,
  useGetGroupQuery,
  useDeleteGroupMutation,
  useCreateGroupMutation,
} = groupApi;
