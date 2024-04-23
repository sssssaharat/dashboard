// Need to use the React-specific entry point to import createApi
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

// Define a service using a base URL and expected endpoints
export const dataApi = createApi({
  reducerPath: "dataApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://sheetdb.io/api/",
  }),
  endpoints: (builder) => ({
    getAllData: builder.query({
      query: () => `v1/0kgbojlcp09qn`,
    }),
    getShowData: builder.query({
      query: () => `v1/0kgbojlcp09qn`,
    }),
  }),
});

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const { useGetAllDataQuery, useGetShowDataQuery } = dataApi;
