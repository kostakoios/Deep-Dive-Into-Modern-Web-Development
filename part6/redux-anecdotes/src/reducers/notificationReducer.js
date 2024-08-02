import { createSlice, current } from '@reduxjs/toolkit'

const initialState = {
    value: ''
}

const notificationSlice = createSlice({
    name: 'notification',
    initialState,
    reducers: {
        showNotification(state, action) {
            console.log('action.payload: ', action.payload, current(state))
            return {...state, value: action.payload}
        },
        clearNotification(state, action) {
            return {...state, value: ''}
        }
    }
})
export  const { showNotification, clearNotification } = notificationSlice.actions 
export default notificationSlice.reducer