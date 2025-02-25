import hyRequest from "../../../service";

export function getSongById(id:number){
    return hyRequest.get({
        url:'/song/url',
        params:{
            id
        }
    })
}

export function getSongDetail(id:number){
    return hyRequest.get({
        url:'/song/detail',
        params:{
            ids:id
        }
    })
}

export function getLyric(id:number){
    return hyRequest.get({
        url:'/lyric',
        params:{
            id
        }
    })
}
