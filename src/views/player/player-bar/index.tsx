import React, {useEffect, useRef, useState } from 'react'
import './index.less'
import {ConfigProvider, Image,Slider} from 'antd';
import { useNavigate } from 'react-router-dom';
import {useAppDispatch, useAppSelector} from "@/store";
import {changeLyricIndex} from "../store/play";
const Index = () => {
    const [isPlaying, setIsPlaying] = useState(true)
    const [progress, setProgress] = useState<number>(0)
    const [duration, setDuration] = useState<number>(0)
    const [current, setCurrent] = useState<string>('00:00')
    const [isSliding, setIsSliding] = useState(false)
    const navigate = useNavigate()
    const {currentSong,songUrl,lyric,lyricIndex} = useAppSelector((state) => ({
        currentSong:state.player.currentSong,
        songUrl:state.player.songUrl,
        lyric:state.player.lyric,
        lyricIndex:state.player.lyricIndex,
    }))
    const dispatch = useAppDispatch()
    useEffect(() => {
        setDuration(currentSong?.dt)
    }, [currentSong]);
    /**
     * 处理播放暂停按钮点击
     */
    const handleClick = () => {
        if(isPlaying){
            console.log('播放')
            audioRef.current?.play()
                .then(() => {
                    console.log('播放成功')
                })
                .catch(err => {
                    console.log('播放失败', err)
                })
        }else{
            audioRef.current?.pause()
        }
        setIsPlaying(!isPlaying)
    }
    const audioRef = useRef<HTMLAudioElement>(null)
    const jump = () => {
        navigate('/discover/player')
    }
    const handleChangeBtnClick = (isNext = true) => {
        console.log('handleChangeBtnClick', isNext)
    }
    /**
     * 处理音乐播放进度
     */
    const handleTimeUpdate = () => {
        const currentTime = audioRef.current?.currentTime
        const progress = currentTime * 1000 / duration * 100
        if(!isSliding){
            setProgress(progress)
            setCurrent(getDuration(currentTime * 1000))
            if(getDuration(currentTime * 1000) === getDuration(duration)){
                setTimeout(() => {
                    setIsPlaying(true)
                    setProgress(0)
                    setCurrent('00:00')
                },1000)
            }
        }
        let index = lyric.length - 1
        for(let i = 0; i < lyric.length; i++){
            if(lyric[i].time > currentTime * 1000){
                index = i - 1
                break;
            }
            if(currentTime * 1000 === duration && i === lyric.length - 1){
                console.log(lyric[i].content)
            }
        }
        if(lyricIndex === index || index === -1){
            return
        }
        dispatch(changeLyricIndex(index))
        console.log(lyric[index].content)
    }
    /**
     * 格式化时间
     * @param duration 音乐时长
     */
    const getDuration = (duration: number) => {
        let seconds = Math.floor(duration / 1000); // 转换为秒数
        const minutes = Math.floor(seconds / 60); // 获取分钟数
        seconds = seconds % 60; // 获取剩余的秒数
        return `${minutes}:${seconds < 10? '0' + seconds : seconds}`
    }
    /**
     * 处理音乐播放进度条变化
     * @param newValue 音乐进度百分比
     */
    const changeProgress = (newValue: number) => {
        setIsSliding(true)
        setProgress(newValue)
        const currentTime = newValue / 100 * duration
        setCurrent(getDuration(currentTime))
    }
    const changeComplete = (value: number) => {
        const currentTime = (value / 100) * duration
        audioRef.current!.currentTime = currentTime / 1000
        setCurrent(getDuration(currentTime))
        setProgress(value)
        setIsSliding(false)
    }
    return(
        <div className="player-bar">
            <div className="content">
                <div className="left">
                    <a className="prev" onClick={() => handleChangeBtnClick(false)}></a>
                    {
                        isPlaying ?
                            (<a className="play" onClick={handleClick}></a>) :
                            (<a className="pause" onClick={handleClick}></a>)
                    }
                    <a className="next" onClick={() => handleChangeBtnClick()}></a>
                </div>
                <audio ref={audioRef} src={songUrl} onTimeUpdate={handleTimeUpdate}></audio>
                <div className="center">
                    <Image onClick={jump} style={{ cursor: 'pointer',borderRadius: '5px' }} preview={false} src={ currentSong?.al?.picUrl + '?param=34y34'} />
                    <div className="base">
                        <div className="info">
                            <a className="title">
                                {currentSong?.name}
                            </a>
                            <a className="artist">
                                {
                                    currentSong?.ar?.[0]?.name || '未知歌手'
                                }
                            </a>
                            <a className="link">link</a>
                        </div>
                        <div className="process">
                            <ConfigProvider theme={{
                                    components: {
                                        Slider: {
                                            railBg:'#000000',
                                            railHoverBg:'rgba(138,138,138)',
                                            trackBg:'rgba(199,12,12)',
                                            trackHoverBg:'rgba(199,12,12)',
                                            handleColor:'rgba(199,12,12)',
                                            handleActiveColor:'rgba(199,12,12)',
                                            handleActiveOutlineColor:'rgba(199,12,12,0.2)',
                                            handleLineWidth:1,
                                            railSize:5
                                        },
                                    },
                                }}>
                                <Slider onAfterChange={changeComplete} onChange={changeProgress} value={progress} tooltip={{formatter: null}} step={0.2}/>
                            </ConfigProvider>
                            <span className="time">
                                <span className="current">{current}</span>
                                <span className="divider">/</span>
                                <span className="duration">{getDuration(duration) == 'NaN:NaN' ? '00:00' : getDuration(duration)}</span>
                            </span>
                        </div>
                        <div className="icons">
                            <a className="icon_1">歌词</a>
                            <a className="icon_2">收藏</a>
                            <a className="icon_3">转发</a>
                        </div>
                    </div>
                </div>
                <div className="right"></div>
            </div>
        </div>
    )
}
export default Index;
