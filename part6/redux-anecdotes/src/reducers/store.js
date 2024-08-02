import { configureStore } from '@reduxjs/toolkit'
import filterReducer from './filterReducer'
import anecdoteReducer from './anecdoteReducer'

export const store = configureStore({
  reducer: {
    anecdotes: anecdoteReducer,
    filter: filterReducer
  },
})