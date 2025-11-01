import { configureStore } from "@reduxjs/toolkit";
import { authApi } from "../store/api/Authapi";
import { productApi } from "./api/productApi";
import { orderApi } from "./api/orderApi";
import { CartApi } from "./api/CartApi";
import { addressApi } from "./api/AddressApi";
import {wishlistApi} from "./api/WishlistApi"
import { searchApi } from "./api/SearchApi";

export const store = configureStore({
  reducer: {
    [authApi.reducerPath]: authApi.reducer,
    [productApi.reducerPath]:productApi.reducer,
    [orderApi.reducerPath]:orderApi.reducer,
    [CartApi.reducerPath]: CartApi.reducer,
    [addressApi.reducerPath]:addressApi.reducer,
    [wishlistApi.reducerPath]:wishlistApi.reducer,
    [searchApi.reducerPath]:searchApi.reducer
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(authApi.middleware).concat(productApi.middleware).concat(orderApi.middleware).concat(CartApi.middleware).concat(addressApi.middleware).concat(wishlistApi.middleware).concat(searchApi.middleware)
});
