import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
export const usersApi = createApi({
  reducerPath: "usersApi",
  baseQuery: fetchBaseQuery({
    baseUrl:
      "https://todolist-api-gems2004.netlify.app/.netlify/functions/server",
    credentials: "include",

    prepareHeaders: (headers, { getState }) => {
      headers.set(
        "Authorization",
        `Bearer ${
          getState().token?.token?.accessToken || getState()?.token?.token
        }`
      );
      return headers;
    },
  }),
  tagTypes: ["Users", "Todos"],
  endpoints: (builder) => ({}),
});
