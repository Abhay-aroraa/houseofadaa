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

export const addressApi = createApi({
  reducerPath: "addressApi",
  baseQuery: baseQueryWithReauth,
  tagTypes: ["Address"],

  endpoints: (builder) => ({
    // ✅ GET all addresses for a user
    getAddressesByUserId: builder.query({
      query: (userId) => `api/address/user/${userId}`,
      providesTags: ["Address"],
    }),

    // ✅ ADD Address
    addAddress: builder.mutation({
      query: ({ userId, body }) => ({
        url: `api/address/add/${userId}`,
        method: "POST",
        body,
      }),
      invalidatesTags: ["Address"],
    }),

    // ✅ DELETE Address
    deleteAddress: builder.mutation({
      query: (addressId) => ({
        url: `api/address/delete/${addressId}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Address"],
    }),

    // ✅ UPDATE Address
    updateAddress: builder.mutation({
      query: ({ addressId, body }) => ({
        url: `api/address/update/${addressId}`,
        method: "PUT",
        body,
      }),
      invalidatesTags: ["Address"],
    }),
  }),
});

export const {
  useGetAddressesByUserIdQuery,
  useAddAddressMutation,
  useDeleteAddressMutation,
  useUpdateAddressMutation,
} = addressApi;
