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

  if (result.error && (result.error.status === 401 || result.error.status === 403)) {
    localStorage.removeItem("authtoken");
  }

  return result;
};

export const CartApi = createApi({
  reducerPath: "CartApi",
  baseQuery: baseQueryWithReauth,
  tagTypes: ["Cart"], 
  endpoints: (builder) => ({

    getCartById: builder.query({
      query: (userId) => ({
        url: `api/cart/${userId}`,
        method: "GET",
      }),
      providesTags: ["Cart"],
    }),

    addToCart: builder.mutation({
      query: ({ userId, productId, size, quantity }) => ({
        url: `api/cart/add/${userId}`,
        method: "POST",
        body: {
          productId,
          size,
          quantity,
        },
      }),
      invalidatesTags: ["Cart"],
    }),


    updateQuantity: builder.mutation({
      query: ({ userId, productId, size, quantity }) => ({
        url: `api/cart/update/${userId}?productId=${productId}&size=${size}&quantity=${quantity}`,
        method: "PUT",
      }),
      invalidatesTags: ["Cart"],
    }),


    removeItem: builder.mutation({
      query: ({ userId, productId, size }) => ({
        url: `api/cart/remove/${userId}?productId=${productId}&size=${size}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Cart"],
    }),

   
    clearCart: builder.mutation({
      query: (userId) => ({
        url: `api/cart/clear/${userId}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Cart"],
    }),

  }),
});

export const {
  useGetCartByIdQuery,
  useLazyGetCartByIdQuery,
  useAddToCartMutation,
  useUpdateQuantityMutation,
  useRemoveItemMutation,
  useClearCartMutation,
} = CartApi;
