import { createSlice, current } from '@reduxjs/toolkit'

// const anecdotesAtStart = [
//   'If it hurts, do it more often',
//   'Adding manpower to a late software project makes it later!',
//   'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
//   'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
//   'Premature optimization is the root of all evil.',
//   'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
// ]

const getId = () => (100000 * Math.random()).toFixed(0)

// const asObject = (anecdote) => {
//   return {
//     content: anecdote,
//     id: getId(),
//     votes: 0
//   }
// }

// const initialState = anecdotesAtStart.map(asObject)

const anecdotSlice = createSlice({
  name: 'anecdotes',
  initialState: [],
  reducers: {
    setAnecdotes(state, action) {
      console.log('actionnnnnnnnnnnnnnnnn: ', action.payload)
      return [...action.payload]
    },
    createAnecdote(state, action) {
      const content = action.payload
      state.push({
        content,
        id: getId(),
        votes: 0
      })
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

export const { createAnecdote, increaseVote, setAnecdotes } = anecdotSlice.actions
export default anecdotSlice.reducer