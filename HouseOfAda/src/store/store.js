import { configureStore } from "@reduxjs/toolkit";
import { authApi } from "../store/api/Authapi";
import { productApi } from "./api/productApi";

export const store = configureStore({
  reducer: {
    [authApi.reducerPath]: authApi.reducer,
    [productApi.reducerPath]:productApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(authApi.middleware).concat(productApi.middleware)
});
