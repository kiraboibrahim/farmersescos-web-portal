import { configureStore } from "@reduxjs/toolkit";
import { farmerApi } from "./services/farmer";
import { setupListeners } from "@reduxjs/toolkit/query";
import { escoApi } from "./services/esco";
import { productApi } from "./services/product";

export const store = configureStore({
  reducer: {
    [farmerApi.reducerPath]: farmerApi.reducer,
    [escoApi.reducerPath]: escoApi.reducer,
    [productApi.reducerPath]: productApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      farmerApi.middleware,
      escoApi.middleware,
      productApi.middleware
    ),
});

setupListeners(store.dispatch);
export default store;
