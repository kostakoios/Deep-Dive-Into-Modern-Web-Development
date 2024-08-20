import { createSlice, current } from '@reduxjs/toolkit'

const blogListSlice = createSlice({
    name: 'bloglist',
    initialState: [],
    reducers: {
        createBlogList(state, action) {
            const content = action.payload
            state.push(content)
        },
        deleteBlogitem(state, action) {
            const blogId = action.payload
            console.log('length before: ', state.length)
            const updatedBloglist =  [...state].filter((blog) => blog.id !== blogId)
            console.log('length after: ', updatedBloglist.length)
            return updatedBloglist
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
        },
        updateBlogLikes(state, action) {
            const updatedBlog = action.payload
            return state.map(blog => 
                blog.id !== updatedBlog.id ? blog : updatedBlog
            )
        }
    }
})

export const { createBlogList, toggleImportanceOf, appendBlogList, deleteBlogitem, updateBlogLikes } = blogListSlice.actions
export default blogListSlice.reducer