import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const baseQuery = fetchBaseQuery({
  baseUrl: import.meta.env.VITE_API_URL,
  prepareHeaders: (headers) => {
    const token = localStorage.getItem("authtoken");
    if (token) {
      headers.set("Authorization", `Bearer ${token}`);
    }
    return headers;
  },
});

const baseQueryWithReauth = async (args, api, extraOptions) => {
  const result = await baseQuery(args, api, extraOptions);

  if (
    result.error &&
    (result.error.status === 401 || result.error.status === 403)
  ) {
    localStorage.removeItem("authtoken");
  }

  return result;
};

export const orderApi = createApi({
  reducerPath: "orderApi",
  baseQuery: baseQueryWithReauth,
  endpoints: (builder) => ({
    getAllOrders: builder.query({
      query: () => ({
        url: "/api/orders/admin/all",
        method: "GET",
      }),
    }),
     getOrderById: builder.query({
      query: (id) => ({
        url: `/api/orders/${id}`,
        method: "GET",
      }),
    }),
    createOrder:builder.mutation({
      query:({body}) =>({
        url: "/api/orders/create",
        method:"POST",
        body
      }),
    })
  }),
});

export const {useGetAllOrdersQuery, useGetOrderByIdQuery} = orderApi