import { configureStore } from '@reduxjs/toolkit'
import blogListReducer from "./bloglistReducer";

export const store = configureStore({
  reducer: {
    bloglist: blogListReducer
  },
})