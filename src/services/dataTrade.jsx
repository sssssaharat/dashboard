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
      query: () => `v1/64j8hcc8hk4vw`,
    }),
    getShowData: builder.query({
      query: () => `v1/64j8hcc8hk4vw`,
    }),
    getTableData: builder.query({
      query: () => `v1/64j8hcc8hk4vw`,
    }),
  }),
});

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const { useGetAllDataQuery, useGetShowDataQuery,useGetTableDataQuery } = dataApi;
