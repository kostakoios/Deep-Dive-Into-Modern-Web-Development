import { createSlice, current } from '@reduxjs/toolkit'

const initialState = {
    value: 'my notification'
}

const notificationSlice = createSlice({
    name: 'notification',
    initialState,
    reducers: {
        showNotification(state, action) {
            console.log('action.payload: ', action.payload, current(state))
            state = {value: action.payload} 
            return state
        }
    }
})
export  const {showNotification} = notificationSlice.actions 
export default notificationSlice.reducer