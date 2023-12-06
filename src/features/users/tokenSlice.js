import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  token: "",
  userData: {},
};
export const tokenSlice = createSlice({
  name: "token",
  initialState,
  reducers: {
    getToken: (state, actions) => {
      state.token = actions.payload;
    },
    getUserData: (state, action) => {
      state.userData = action.payload;
    },
  },
});

export const { getToken, getUserData } = tokenSlice.actions;
export const tokenReducer = tokenSlice.reducer;
