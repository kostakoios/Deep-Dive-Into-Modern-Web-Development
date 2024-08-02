import { createSlice, current } from '@reduxjs/toolkit'
import  anecdotesService  from '../services/anecdotes'

const anecdotSlice = createSlice({
  name: 'anecdotes',
  initialState: [],
  reducers: {
    setAnecdotes(state, action) {
      return [...action.payload]
    },
    createAnecdote(state, action) {
      const newAnecdoteObj = action.payload
      state.push(newAnecdoteObj)
    },
    increaseVote(state, action) {
      const id = action.payload
      const anectodeToChange = state.find(anecdot => anecdot.id === id)
      console.log('anectodeToChange: ', anectodeToChange)
      const changedAnecdote = {
        ...anectodeToChange,
        votes: anectodeToChange.votes + 1
      }
      console.log('current state for increaseVot: ', current(state))
      return state.map(anectode => anectode.id !== id ? anectode : changedAnecdote)
    }
  }
})

export const initializeAnecdotes = () => {
  return async dispatch => {
    const anecdotes = await anecdotesService.getAll()
    dispatch(setAnecdotes(anecdotes))
  }
}

export const createNew = (content) => {
  return async dispatch => {
    const newObj = await anecdotesService.createNew(content)
    dispatch(createAnecdote(newObj))
  }
}

export const { createAnecdote, increaseVote, setAnecdotes } = anecdotSlice.actions
export default anecdotSlice.reducer