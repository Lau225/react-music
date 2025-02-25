import {createSlice,createAsyncThunk } from '@reduxjs/toolkit';
import {getLyric, getSongById, getSongDetail} from "../service";
import {parseLyric} from "@/utils/parse-lyric";

export const fetchCurrentSongAction = createAsyncThunk(
    'currentSong',
    async (id:number,{dispatch}) => {
        const res = await getSongDetail(id)
        dispatch(changeCurrentSong(res.songs[0]))
        const res1 = await getSongById(id)
        dispatch(changeUrl(res1.data?.[0]?.url))
        const res2 = await getLyric(id)
        dispatch(changeLyric(parseLyric(res2.lrc.lyric)))
        console.log(parseLyric(res2.lrc.lyric))
    }
);

export interface ILyric{
    time:number,
    content:string
}

interface IPlayerState {
    currentSong: any,
    songUrl: string,
    lyric: ILyric[],
    lyricIndex:number
}

const initialState:IPlayerState = {
    currentSong: {},
    songUrl:"",
    lyric:[],
    lyricIndex:-1
}

const playerSlice = createSlice({
    name: 'player',
    initialState,
    reducers:{
        changeUrl(state, {payload}){
            state.songUrl = payload;
        },
        changeCurrentSong(state, {payload}){
            state.currentSong = payload;
        },
        changeLyric(state, {payload}){
            state.lyric = payload;
        },
        changeLyricIndex(state, {payload}){
            state.lyricIndex = payload;
        }
    },
})
export const {changeLyricIndex,changeLyric,changeCurrentSong,changeUrl} = playerSlice.actions;
export default playerSlice.reducer;
