import { createEntityAdapter } from "@reduxjs/toolkit";
import { usersApi } from "../api/apiSlice";
const todoAdapter = createEntityAdapter({});
const initialState = todoAdapter.getInitialState();
export const extendedTodoApiSlice = usersApi.injectEndpoints({
  overrideExisting: true,
  endpoints: (builder) => ({
    getAllTodo: builder.query({
      query: ({ date }) => ({
        url: `/todos/${date}`,
      }),
      providesTags: (result, error, arg) =>
        result === true
          ? [...result?.map(({ _id }) => ({ type: "Todos", _id })), "Todos"]
          : ["Todos"],
    }),
    getAllCompletedTodoToday: builder.query({
      query: (date) => ({
        url: `/todos/${date}`,
      }),
      providesTags: (result, error, arg) =>
        result === true
          ? [...result?.map(({ _id }) => ({ type: "Todos", _id })), "Todos"]
          : ["Todos"],
    }),
    addNewTodo: builder.mutation({
      query: (initialPost) => ({
        url: `/todos`,
        method: "POST",
        body: initialPost,
      }),
      invalidatesTags: ["Todos"],
    }),
    editTodo: builder.mutation({
      query: ({ ...initialPost }) => ({
        url: `/todos`,
        method: "PATCH",
        body: initialPost,
      }),
      invalidatesTags: ["Todos"],
    }),
  }),
});
export const {
  useLazyGetAllTodoQuery,
  useAddNewTodoMutation,
  useEditTodoMutation,
  useLazyGetAllCompletedTodoTodayQuery,
} = extendedTodoApiSlice;
