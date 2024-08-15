import { createSlice, current } from '@reduxjs/toolkit'

const blogListSlice = createSlice({
    name: 'bloglist',
    initialState: [],
    reducers: {
        createBlogList(state, action) {
            const content = action.payload
            state.push({
                content,
                important: false,
                id: generateId(),
            })
        },
        toggleImportanceOf(state, action) {
            const id = action.payload
            const noteToChange = state.find(n => n.id === id)
            const changedNote = {
                ...noteToChange,
                important: !noteToChange.important
            }
            
            console.log(current(state))

            return state.map(note =>
                note.id !== id ? note : changedNote
            )
        },
        appendBlogList(state, action) {
            console.log('blogsss inside appendBloglist: ', action.payload)
           return action.payload
        }
    }
})

export const { createBlogList, toggleImportanceOf, appendBlogList } = blogListSlice.actions
export default blogListSlice.reducer

// const blogListReducer = (state = [], action) => {
//     switch (action.type) {
//         case 'GET_BLOGLISTS':
//             return state.concat(action.payload)
//         default:
//             return state
//     }

// }

// const generateId = () =>
//     Number((Math.random() * 1000000).toFixed(0))


// export const createNote = (content) => {
//     return {
//         type: 'NEW_NOTE',
//         payload: {
//             content,
//             important: false,
//             id: generateId()
//         }
//     }
// }


// export const toggleImportanceOf = (id) => {
//     return {
//         type: 'TOGGLE_IMPORTANCE',
//         payload: { id }
//     }
// }

// export default blogListReducer