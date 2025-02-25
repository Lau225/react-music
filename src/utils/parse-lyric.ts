import {ILyric} from "../views/player/store/play";

export const parseLyric = (lyric: string) => {
    const timeRegExp = /\[(\d{2}):(\d{2})\.(\d{2,3})\]/
    const lyricList: ILyric[] = []
    const lines:string[] = lyric.split('\n')
    for(const line of lines){
        const result = timeRegExp.exec(line)
        if(!result) continue
        const time1 = Number(result[1]) * 60 * 1000
        const time2 = Number(result[2]) * 1000
        const time3 = Number(result[3])
        const time = time1 + time2 + time3

        const content = line.replace(timeRegExp, '')
        lyricList.push({time,content})
    }
    return lyricList
}
