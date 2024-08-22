import { createSlice, current } from '@reduxjs/toolkit'

const blogListSlice = createSlice({
    name: 'userInfo',
    initialState: {},
    reducers: {
        appendUser(state, action) {
            console.log('blogsss inside appendBloglist: ', action.payload)  
           return action.payload
        },
        removeUser(state, action) {
            return action.payload;
        }
    }
})

export const { appendUser, removeUser } = blogListSlice.actions
export default blogListSlice.reducer