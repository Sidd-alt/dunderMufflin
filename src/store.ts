import { configureStore } from "@reduxjs/toolkit";
import productsInfoSlice from "./Reducers/productsInfoSlice";

export const store = configureStore({
  reducer: {
    productsInfo: productsInfoSlice,
  },
});
