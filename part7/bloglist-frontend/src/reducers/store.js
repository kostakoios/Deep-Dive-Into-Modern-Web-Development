import { configureStore } from '@reduxjs/toolkit'
import blogListReducer from "./bloglistReducer";
import userReducer from './userReducer';

export const store = configureStore({
  reducer: {
    bloglist: blogListReducer,
    user: userReducer
  },
})