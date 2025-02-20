import React, { useState } from 'react'
import './index.less'
import {ConfigProvider, Image,Slider} from 'antd';
import { useNavigate } from 'react-router-dom';
const Index = () => {
    const [isPlaying, setIsPlaying] = useState(false)
    const navigate = useNavigate()
    const handleClick = () => {
        setIsPlaying(!isPlaying)
    }
    const jump = () => {
        navigate('')
    }
    return(
        <div className="player-bar">
            <div className="content">
                <div className="left">
                    <a className="prev"></a>
                    {
                        isPlaying ? (<a className="play" onClick={handleClick}></a>): (<a className="pause" onClick={handleClick}></a>)
                    }
                    <a className="next"></a>
                </div>
                <div className="center">
                    <Image onClick={jump} style={{ cursor: 'pointer',borderRadius: '5px' }} preview={false} src="https://p1.music.126.net/Ym3N-yC83r8l0Sf6ht5qIA==/109951165454950112.jpg?param=34y34" />
                    <div className="base">
                        <div className="info">
                            <a className="title">
                                日落大道
                            </a>
                            <a className="artist">
                                梁博
                            </a>
                            <a className="link">link</a>
                        </div>
                        <div className="process">
                            <ConfigProvider
                                theme={{
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
                                }}
                            >
                                <Slider tooltip={{
                                    formatter: null,
                                }}/>
                            </ConfigProvider>
                            <span className="time">
                                <span className="current">00:52</span>
                                <span className="divider">/</span>
                                <span className="duration">04:35</span>
                            </span>
                        </div>
                        <div className="icons">
                            <a className="icon_1">歌词</a>
                            <a className="icon_2">收藏</a>
                            <a className="icon_3">转发</a>
                        </div>
                    </div>
                </div>
                <div className="right">right</div>
            </div>
        </div>
    )
}
export default Index;
