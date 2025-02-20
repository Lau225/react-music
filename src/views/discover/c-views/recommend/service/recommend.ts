import hyRequest from "@/service";

export function getBanners(){
    return hyRequest.get({
        url:"/banner"
    })
}

export function getHotRecommend(limit:number = 30){
    return hyRequest.get({
        url:'/personalized',
        params:{
            limit:limit
        }
    })
}
export function getNewAlbums(){
    return hyRequest.get({
        url:'/album/newest',
    })
}

export function getPlayList(id:number){
    return hyRequest.get({
        url:'/playlist/detail',
        params:{
            id
        }
    })
}

export function getArtistList(limit:number = 30){
    return hyRequest.get({
        url:'/artist/list',
        params:{
            limit
        }
    })
}
