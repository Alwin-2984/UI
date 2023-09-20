import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  searchData: "",
  filterVenue: "",
  filterCategory: "",
  filterDate: "",
};

export const counterSlice = createSlice({
  name: "search",
  initialState,
  reducers: {
    setSearchData: (state, action) => {
      state.searchData = action.payload;
    },
    setFilterVenue: (state, action) => {
      state.filterVenue = action.payload;
    },
    setFilterCategory: (state, action) => {
      state.filterCategory = action.payload;
    },
    setFilterDate: (state, action) => {
      state.filterDate = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const {
  setSearchData,
  setFilterVenue,
  setFilterCategory,
  setFilterDate,
} = counterSlice.actions;
export const getSearchData = (state) => state?.search?.searchData;

export const getFilterVenue = (state) => state?.search?.filterVenue;

export const getFilterCategory = (state) => state?.search?.filterCategory;

export const getFilterDate = (state) => state?.search?.filterDate;

export default counterSlice.reducer;
