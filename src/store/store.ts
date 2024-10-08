import { configureStore } from "@reduxjs/toolkit";
import { themeSliceReducer } from "./themeSlice";
import { mobileNavReducer } from "./mobileNavSlice";
import { apiSlice } from "./apiSlice";
import { setupListeners } from "@reduxjs/toolkit/query";
import authSliceReducer from "./authSlice";

export const store = configureStore({
  reducer: {
    auth: authSliceReducer,
    theme: themeSliceReducer,
    mobileNav: mobileNavReducer,
    [apiSlice.reducerPath]: apiSlice.reducer,
  },
  // Adding the api middleware enables caching, invalidation, polling,
  // and other useful features of `rtk-query`.
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(apiSlice.middleware),
});

// optional, but required for refetchOnFocus/refetchOnReconnect behaviors
// see `setupListeners` docs - takes an optional callback as the 2nd arg for customization
setupListeners(store.dispatch);

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
