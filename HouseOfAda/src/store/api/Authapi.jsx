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
    // Optional redirect:
    // window.location.href = "/login";
  }

  return result;
};

export const authApi = createApi({
  reducerPath: "authApi",
  baseQuery: baseQueryWithReauth,
  endpoints: (builder) => ({
    sendOtp: builder.mutation({
      query: (email) => ({
        url: "auth/send-otp",
        method: "POST",
        body: { email },
      }),
    }),
    verifyOtp: builder.mutation({
      query: (data) => ({
        url: "auth/verify-otp",
        method: "POST",
        body: data,
      }),
    }),
    login: builder.mutation({
      query: (data) => ({
        url: "auth/login",
        method: "POST",
        body: data,
      }),
    }),
    getAllUsers:builder.query({
      query:() => ({
        url:"auth/users",
        method: "GET",
      })
    }),
     deleteById: builder.mutation({
      query: (id) => ({
        url: `auth/id/${id}`,
        method: "DELETE",
      }),
    }),
  }),
});

export const {
  useSendOtpMutation,
  useVerifyOtpMutation,
  useLoginMutation,
  useGetAllUsersQuery,
  useDeleteByIdMutation
} = authApi;
