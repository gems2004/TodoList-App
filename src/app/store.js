import { configureStore } from "@reduxjs/toolkit";
import { usersApi } from "../features/api/apiSlice";
import { tokenReducer } from "../features/users/tokenSlice";
import { dateReducer } from "../features/date/dateSlice";
export const store = configureStore({
  reducer: {
    [usersApi.reducerPath]: usersApi.reducer,
    token: tokenReducer,
    date: dateReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(usersApi.middleware),
});
