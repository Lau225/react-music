import { createSlice } from "@reduxjs/toolkit";

const counterSlice = createSlice({
    name: 'counter',
    initialState: {
        count: 100,
        name: '还好',
        message: '你好'
    },
    reducers: {
        changeMessage(state, { payload }) {
            state.message = payload
        }
    }
})
export const { changeMessage } = counterSlice.actions
export default counterSlice.reducer