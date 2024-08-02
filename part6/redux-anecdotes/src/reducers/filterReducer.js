import { createSlice, current } from '@reduxjs/toolkit'

const initialState = {
    value: ''
}

export const anecdotesFilterSlice = createSlice({
    name: 'filter',
    initialState,
    reducers: {
        filterAnecdotes(state, action) {
            console.log('action.payload: ', action.payload, current(state))
            state = {value: action.payload} 
            return state
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
export const { filterAnecdotes } = anecdotesFilterSlice.actions
export default anecdotesFilterSlice.reducer