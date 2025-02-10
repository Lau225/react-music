import { useSelector, TypedUseSelectorHook,useDispatch } from 'react-redux';
import counterSlice from './modules/counter'
import { configureStore } from "@reduxjs/toolkit";
import recommendReducer from '../views/discover/c-views/recommend/store/recommend'
const store = configureStore({
    reducer: {
        counter: counterSlice,
        recommend: recommendReducer
    }
})
export type IRootState = ReturnType<typeof store.getState>

export const useAppSelector: TypedUseSelectorHook<IRootState> = useSelector
export const useAppDispatch: () => any = useDispatch;

export default store;
