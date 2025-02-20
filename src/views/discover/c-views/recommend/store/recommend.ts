import {createSlice, createAsyncThunk} from '@reduxjs/toolkit'
import {getArtistList, getBanners, getHotRecommend, getNewAlbums, getPlayList} from "../service/recommend";

export const fetchBannerDataAction = createAsyncThunk('banners', async (arg, {dispatch}) => {
    const res = await getBanners()
    dispatch(changeBannersAction(res.banners))
})
export const fetchHotRecommendAction = createAsyncThunk('hotRecommend', async (arg, {dispatch}) => {
    const res = await getHotRecommend(8)
    dispatch(changeHotRecommendAction(res.result))
})
export const fetchNewAlbumAction = createAsyncThunk('newAlbum', async (arg, {dispatch}) => {
    const res = await getNewAlbums()
    dispatch(changeNewAlbumAction(res.albums))
})
export const fetchArtistAction = createAsyncThunk('artist', async (arg, {dispatch}) => {
    const res = await getArtistList(5)
    dispatch(changeArtistAction(res.artists))
})
const rankingIds = [19723756,3779629,2884035]
export const fetchRankingAction = createAsyncThunk('ranking', async (arg, {dispatch}) => {
    for(const id of rankingIds){
        const res = await getPlayList(id)
        dispatch(changeRankingAction(res.playlist))
        console.log(res)
    }
})
interface IRecommendState {
    banners: IBanner[];
    hotRecommend: IHotRecommend[];
    newAlbum: IAlbum[];
    ranking:any[],
    artist:any[]
}

export interface IAlbum{
    "name": string
    id: number
    type: string
    size: number
    picId: number
    blurPicUrl: string
    companyId: number
    pic: number
    picUrl: string
    publishTime: number
    description: string
    tags: string
    company: string
    briefDesc: string
    artist: any,
    songs: null
    alias: Array< unknown >
    status: number
    copyrightId: number
    commentThreadId: string
    artists: Array<any>
    paid: boolean
    onSale: boolean
    picId_str: string
}

export interface IBanner {
    imageUrl: string;
    targetId: number;
    adid?: any;
    targetType: number;
    titleColor: string;
    typeTitle: string;
    url: string;
    exclusive: boolean;
    monitorImpress?: any;
    monitorClick?: any;
    monitorType?: any;
    monitorImpressList?: any;
    monitorClickList?: any;
    monitorBlackList?: any;
    extMonitor?: any;
    extMonitorInfo?: any;
    adSource?: any;
    adLocation?: any;
    adDispatchJson?: any;
    encodeId: string;
    program?: any;
    event?: any;
    video?: any;
    song?: any;
    scm: string;
    bannerBizType: string;
}

export interface IHotRecommend {
    id: number
    type: number
    name: string
    copywriter: string
    picUrl: string
    canDislike: boolean
    trackNumberUpdateTime: number
    playCount: number
    trackCount: number
    highQuality: boolean
    alg: string
}

const initialState: IRecommendState = {
    banners: [],
    hotRecommend: [],
    newAlbum: [],
    ranking: [],
    artist:[]
}
const recommendSlice = createSlice({
    name: 'recommend',
    initialState,
    reducers: {
        changeBannersAction(state, {payload}) {
            state.banners = payload
        },
        changeHotRecommendAction(state, {payload}) {
            state.hotRecommend = payload
        },
        changeNewAlbumAction(state,{payload}){
            state.newAlbum = payload
        },
        changeRankingAction(state,{payload}){
            state.ranking.push(payload)
        },
        changeArtistAction(state,{payload}){
          state.artist = payload
        }
    },
})
export const {changeArtistAction,changeRankingAction,changeBannersAction, changeHotRecommendAction, changeNewAlbumAction} = recommendSlice.actions
export default recommendSlice.reducer
