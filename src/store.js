import { configureStore } from "@reduxjs/toolkit";
import { todoReducer } from "./Reducer/todoReducer";
export const todoStore = configureStore({
  reducer: { todoReducer },
});
