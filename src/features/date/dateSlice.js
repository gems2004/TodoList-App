import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  year: "",
  month: "",
  day: "",
  isoDate: "",
};
export const dateSlice = createSlice({
  name: "date",
  initialState,
  reducers: {
    getFullDate: (state, action) => {
      state.year = action.payload.year;
      state.month = action.payload.month;
      state.day = action.payload.day;
      state.isoDate = action.payload.isoDate;
    },
  },
});
export const { getFullDate } = dateSlice.actions;
export const dateReducer = dateSlice.reducer;
