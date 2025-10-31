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

export const wishlistApi = createApi({
  reducerPath: "wishlistApi",
  baseQuery: baseQueryWithReauth,
  tagTypes: ["Wishlist"],

  endpoints: (builder) => ({

    // ✅ Add to wishlist
    addToWishlist: builder.mutation({
      query: (productId) => ({
        url: `/api/wishlist/add/${productId}`,
        method: "POST",
      }),
      invalidatesTags: ["Wishlist"],
    }),

    // ✅ Get wishlist items
    getWishlist: builder.query({
      query: () => ({
        url: `/api/wishlist`,
        method: "GET",
      }),
      providesTags: ["Wishlist"],
    }),

    // ✅ Remove from wishlist
    removeFromWishlist: builder.mutation({
      query: (productId) => ({
        url: `/api/wishlist/remove/${productId}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Wishlist"],
    }),
  }),
});

export const {
  useAddToWishlistMutation,
  useGetWishlistQuery,
  useRemoveFromWishlistMutation,
} = wishlistApi;
