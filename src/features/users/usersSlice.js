import { createEntityAdapter } from "@reduxjs/toolkit";
import { usersApi } from "../api/apiSlice";
const usersAdapter = createEntityAdapter({});
const initialState = usersAdapter.getInitialState();
export const extendedUsersApiSlice = usersApi.injectEndpoints({
  endpoints: (builder) => ({
    createNewUser: builder.mutation({
      query: (initialPost) => ({
        url: `/users`,
        method: "POST",
        body: initialPost,
      }),
    }),
    getUser: builder.query({
      query: () => ({
        url: `/users`,
      }),
      transformResponse: (response) => {
        return response.map((item) => {
          return {
            id: item._id,
            email: item.email,
          };
        });
      },
    }),
    authLogin: builder.mutation({
      query: (initialPost) => ({
        url: `/auth`,
        method: "POST",
        body: initialPost,
      }),
    }),
    authTokenRefresh: builder.query({
      query: () => ({
        url: `/auth/refresh`,
      }),
    }),
  }),
});
export const {
  useCreateNewUserMutation,
  useAuthLoginMutation,
  useAuthTokenRefreshQuery,
  useLazyGetUserQuery,
} = extendedUsersApiSlice;
