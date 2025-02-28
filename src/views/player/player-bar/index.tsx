import React, {useEffect, useRef, useState } from 'react'
import './index.less'
import {ConfigProvider, Image,Slider,message} from 'antd';
import { useNavigate } from 'react-router-dom';
import {useAppDispatch, useAppSelector} from "@/store";
import {changeLyricIndex, fetchCurrentSongAction} from "../store/play";
const Index = () => {
    const [isPlaying, setIsPlaying] = useState(true)
    const [progress, setProgress] = useState<number>(0)
    const [duration, setDuration] = useState<number>(0)
    const [current, setCurrent] = useState<string>('00:00')
    const [isSliding, setIsSliding] = useState(false)
    const [listVisible, setListVisible] = useState(false)
    const navigate = useNavigate()
    const {currentSong,songUrl,lyric,lyricIndex,playSongList,playSongIndex} = useAppSelector((state) => ({
        currentSong:state.player.currentSong,
        songUrl:state.player.songUrl,
        lyric:state.player.lyric,
        lyricIndex:state.player.lyricIndex,
        playSongList:state.player.playSongList,
        playSongIndex:state.player.playSongIndex,
    }))
    const dispatch = useAppDispatch()
    useEffect(() => {
        setDuration(currentSong?.dt)
        setIsPlaying(true)
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
    const handleChangeBtnClick = (isNext:boolean) => {
        setIsPlaying(true)
        setProgress(0)
        setCurrent('00:00')
        audioRef.current.currentTime = 0
        audioRef.current.pause()
        if(!isNext){
            // 上一首
            // 先判断是否有上一首歌曲
            if(playSongIndex === 0){
                dispatch(fetchCurrentSongAction(playSongList[0].id))
            }else{
                dispatch(fetchCurrentSongAction(playSongList[playSongIndex - 1].id))
            }
        }else{
            // 下一首
            // 先判断是否有下一首歌曲
            if(playSongIndex === playSongList.length - 1){
                dispatch(fetchCurrentSongAction(playSongList[0].id))
            }else{
                dispatch(fetchCurrentSongAction(playSongList[playSongIndex + 1].id))
            }
        }
    }

    /**
     * 处理音乐播放结束
     */
    const endPlay = () => {
        setIsPlaying(true)
        setProgress(0)
        setCurrent('00:00')
        if(playSongIndex === playSongList.length - 1){
            dispatch(fetchCurrentSongAction(playSongList[0].id))
        }else{
            dispatch(fetchCurrentSongAction(playSongList[playSongIndex + 1].id))
        }
    }

    const showList = () => {
        setListVisible(!listVisible)
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
        showLyric(index)
    }
    const showLyric = (index:number) => {
        return message.open({
            content:lyric[index].content,
            duration:0,
            key:'lyric'
        })
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
    const playList = (id:number) => {
        dispatch(fetchCurrentSongAction(id))
    }
    return(
        <div className="player-bar">
            {listVisible &&
                <div className="lyric">
                    <div className="header">
                    <div style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        height: '100%'
                    }}>
                        <span style={{
                            color: '#E2E2E2',
                            fontSize: '14px',
                            fontWeight: 'bold',
                            marginLeft: '30px'
                        }}>播放列表({playSongList.length})</span>
                        <a className="del">删除</a>
                    </div>
                </div>
                    <div className="lyric-content">
                        <ul className="lyric-list">
                            {
                                playSongList.map((item,index) => {
                                    return (
                                        <li className="lyric-list-item" key={item.id} onClick={() => playList(item.id)}>
                                            <div className="lyric-list-item-left">
                                                <a className="lyric-list-icon" style={{visibility: index === playSongIndex ? 'visible' : 'hidden'}}></a>
                                                <span className="lyric-list-text">{item.name}</span>
                                            </div>
                                            <div className="lyric-list-item-right">
                                                <span className="ar lyric-list-text">{item.ar?.[0]?.name || '未知歌手'}</span>
                                                <span className="time lyric-list-text">
                                                    {item.dt ? getDuration(item.dt) : '00:00'}
                                                </span>
                                            </div>
                                        </li>
                                    )
                                })
                            }
                        </ul>
                    </div>
                </div>
            }
            <div className="content">
                <div className="left">
                    <a className="prev" onClick={() => handleChangeBtnClick(false)}></a>
                    {
                        isPlaying ?
                            (<a className="play" onClick={handleClick}></a>) :
                            (<a className="pause" onClick={handleClick}></a>)
                    }
                    <a className="next" onClick={() => handleChangeBtnClick(true)}></a>
                </div>
                <audio ref={audioRef} src={songUrl} onEnded={() => endPlay()} onTimeUpdate={handleTimeUpdate}></audio>
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
                <div className="right">
                    <a onClick={showList} className="list"></a>
                    <span style={{ position: 'absolute', right: '16px', top: '7px', fontSize: '12px', color: '#666666' }}>{playSongList.length}</span>
                </div>
            </div>
        </div>
    )
}
export default Index;
