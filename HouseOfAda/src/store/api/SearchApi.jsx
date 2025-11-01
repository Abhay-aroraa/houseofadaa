import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const baseQuery = fetchBaseQuery({
  baseUrl: import.meta.env.VITE_API_URL, // Example: http://localhost:8080/product
  prepareHeaders: (headers) => {
    const token = localStorage.getItem("authtoken");
    if (token) {
      headers.set("Authorization", `Bearer ${token}`);
    }
    return headers;
  },
});

export const searchApi = createApi({
  reducerPath: "searchApi",
  baseQuery,
  endpoints: (builder) => ({
    searchProducts: builder.query({
      query: (keyword) => ({
        url: `/products/search?keyword=${keyword}`,
        method: "GET",
      }),
    }),
  }),
});

export const { useSearchProductsQuery } = searchApi;
