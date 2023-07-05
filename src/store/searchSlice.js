import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  keyword: "",
};

const searchSlice = createSlice({
  name: "search",
  initialState,
  reducers: {
    saveKeyword : (state, action) => {
      state.keyword = action.payload;
    },
  },
});

export const { saveKeyword } = searchSlice.actions;
export default searchSlice.reducer;
