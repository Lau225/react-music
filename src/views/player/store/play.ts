import {createSlice,createAsyncThunk } from '@reduxjs/toolkit';
import {getLyric, getSongById, getSongDetail} from "../service";
import {parseLyric} from "@/utils/parse-lyric";

export const fetchCurrentSongAction = createAsyncThunk(
    'currentSong',
    async (id:number,{dispatch,getState}) => {
        const playList = (getState() as RootState).player.playSongList;
        if(playList.length > 0){
            const index = playList.findIndex(item => item.id === id);
            if(index > -1){
                dispatch(changeCurrentSong(playList[index]))
                dispatch(changePlaySongIndex(index))
            }else if(index === -1){
                const res = await getSongDetail(id)
                dispatch(changeCurrentSong(res.songs[0]))
                dispatch(changePlaySongList(res.songs[0]))
                dispatch(changePlaySongIndex(playList.length))
            }
        }else{
            const res = await getSongDetail(id)
            dispatch(changeCurrentSong(res.songs[0]))
            dispatch(changePlaySongList(res.songs[0]))
            dispatch(changePlaySongIndex(playList.length))
        }
        const res1 = await getSongById(id)
        dispatch(changeUrl(res1.data?.[0]?.url))
        const res2 = await getLyric(id)
        dispatch(changeLyric(parseLyric(res2.lrc.lyric)))
    }
);
interface PlayerState {
    playSongList: any[]; // 根据实际情况替换为具体类型
    // 其他 player 相关的 state 属性
}
interface RootState {
    player: PlayerState;
    // 其他 slices 的 state 属性
}
export interface ILyric{
    time:number,
    content:string
}

interface IPlayerState {
    currentSong: any,
    songUrl: string,
    lyric: ILyric[],
    lyricIndex:number,
    playSongList:any[],
    playSongIndex:number
}

const initialState:IPlayerState = {
    currentSong: {},
    songUrl:"",
    lyric:[],
    lyricIndex:-1,
    playSongList:[],
    playSongIndex:0
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
        },
        changePlaySongList(state, {payload}){
            state.playSongList.push(payload)
        },
        changePlaySongIndex(state, {payload}){
            state.playSongIndex = payload;
        }
    },
})
export const {changePlaySongIndex,
    changePlaySongList,
    changeLyricIndex,
    changeLyric,
    changeCurrentSong,
    changeUrl
} = playerSlice.actions;
export default playerSlice.reducer;
