import { configureStore } from "@reduxjs/toolkit";
import { farmerApi } from "./services/farmer";
import { setupListeners } from "@reduxjs/toolkit/query";
import { escoApi } from "./services/esco";
import { productApi } from "./services/product";
import { installationApi } from "./services/installation";
import authReducer from "./slices/auth";
import { authApi } from "./services/auth";
import authMiddleware from "./middleware/auth";
import { productCategoriesApi } from "./services/product-categories";

export const store = configureStore({
  reducer: {
    [authApi.reducerPath]: authApi.reducer,
    [farmerApi.reducerPath]: farmerApi.reducer,
    [escoApi.reducerPath]: escoApi.reducer,
    [productApi.reducerPath]: productApi.reducer,
    [productCategoriesApi.reducerPath]: productCategoriesApi.reducer,
    [installationApi.reducerPath]: installationApi.reducer,
    auth: authReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      authApi.middleware,
      farmerApi.middleware,
      escoApi.middleware,
      productApi.middleware,
      productCategoriesApi.middleware,
      installationApi.middleware,
      authMiddleware
    ),
});

setupListeners(store.dispatch);
export default store;
