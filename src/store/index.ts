import { useSelector, TypedUseSelectorHook } from 'react-redux';
import counterSlice from './modules/counter'
import { configureStore } from "@reduxjs/toolkit";

const store = configureStore({
    reducer: {
        counter: counterSlice
    }
})
export type IRootState = ReturnType<typeof store.getState>

export const useAppSelector: TypedUseSelectorHook<IRootState> = useSelector


export default store;
