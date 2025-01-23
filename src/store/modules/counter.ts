import { createSlice } from "@reduxjs/toolkit";

const counterSlice = createSlice({
    name: 'counter',
    initialState: {
        count: 100,
        name: '还好',
        message: '你好'
    },
    reducers: {}
})

export default counterSlice.reducer