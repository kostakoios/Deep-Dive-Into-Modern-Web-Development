import { createSlice, current } from '@reduxjs/toolkit'

const initialState = {
    value: ''
}

export const anecdotesSlice = createSlice({
    name: 'filter',
    initialState,
    reducers: {
        filterAnecdotes(state, action) {
            console.log('action.payload: ', action.payload, current(state))
            return {value: action.payload}
        }
    }
})
// const filterReducer = (state = '', action) => {
//     switch (action.type) {
//         case 'SET_FILTER':
//             return action.payload
//         default:
//             return state
//     }
// }

// export const filterChange = filter => {
//     return {
//         type: 'SET_FILTER',
//         payload: filter,
//     }
// }

// export default filterReducer
export const { filterAnecdotes } = anecdotesSlice.actions
export default anecdotesSlice.reducer