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

export const productApi = createApi({
  reducerPath: "productApi",
  baseQuery: baseQueryWithReauth,
  endpoints: (builder) => ({
    addProduct: builder.mutation({
      query: (productData) => {
        const formData = new FormData();
        formData.append("name", productData.name);
        formData.append("description", productData.description);
        formData.append("price", productData.price);
        formData.append("file", productData.file); 
        formData.append("stock", productData.stock);

        return {
          url: "/products/upload",
          method: "POST",
          body: formData,
        };
      },
    }),

    getProductList: builder.query({
      query: () => ({
        url: "/products/list",
        method: "GET",
      }),
    }),
   getProductById: builder.query({
  query: (id) => ({
    url: `products/id/${id}`, 
    method: "GET",
  }),
}),

  }),
});

export const { useAddProductMutation, useGetProductListQuery,useGetProductByIdQuery } = productApi;

