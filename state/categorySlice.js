import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  categories: [],
};
const categorySlice = createSlice({
  name: "categories",
  initialState,
  reducers: {
    addCategory: (state, action) => {
      state.categories = action.payload;
    },
    deleteCategory: (state, action) => {
      state.categories = state.categories.filter(
        (category) => category.id !== action.payload
      );
    },
  },
});

export const { addCategory, deleteCategory } = categorySlice.actions;
export default categorySlice;
