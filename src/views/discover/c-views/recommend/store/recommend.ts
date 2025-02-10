import {createSlice,createAsyncThunk} from '@reduxjs/toolkit'
import {getBanners} from "../service/recommend";
export const fetchBannerDataAction = createAsyncThunk('banners', async (arg,{dispatch}) => {
    const res = await getBanners()
    dispatch(changeBannersAction(res.banners))
})
interface IRecommendState {
    banners: IBanner[];
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

const initialState: IRecommendState = {
    banners:[],
}
const recommendSlice = createSlice({
    name:'recommend',
    initialState,
    reducers: {
        changeBannersAction(state,{payload}){
            state.banners = payload
        }
    },
})
export const {changeBannersAction} = recommendSlice.actions
export default recommendSlice.reducer
