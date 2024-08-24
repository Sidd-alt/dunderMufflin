import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  products: {},
};

export const productsInfoSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    productsData: (state, action) => {
      state.products = action.payload;
    },
  },
});

export const { productsData } = productsInfoSlice.actions;

export default productsInfoSlice.reducer;
