import React, {useEffect, useState} from 'react'
import Title from "@/components/title";
import './index.less'
import {Col, Divider, Row, Space} from 'antd';
import {useAppDispatch} from "@/store";
import {fetchHotRecommendAction} from "../../store/recommend";
import {useAppSelector} from "@/store";
import { Image } from "antd";
const Index = () => {
    const dispatch = useAppDispatch();
    const {hotRecommend} = useAppSelector((state) => ({
        hotRecommend:state.recommend.hotRecommend
    }))
    useEffect(() => {
        dispatch(fetchHotRecommendAction())
    }, [dispatch]);
    return <div>
        <div>
            <Title  children={<div style={{display: 'flex', alignItems: 'center'}}>
                <div style={{fontSize: '20px', fontWeight: 'normal'}}>热门推荐</div>
                <Space style={{marginTop: '3px', marginLeft: '20px'}}>
                    <a href="" style={{fontSize: '12px', color: '#666666',}}>华语</a>
                    <Divider type="vertical"/>
                    <a href="" style={{fontSize: "12px", color: "#666666",}}>流行</a>
                    <Divider type="vertical"/>
                    <a href="" style={{fontSize: "12px", color: "#666666",}}>摇滚</a>
                    <Divider type="vertical"/>
                    <a href="" style={{fontSize: "12px", color: "#666666",}}>民谣</a>
                    <Divider type="vertical"/>
                    <a href="" style={{fontSize: "12px", color: "#666666",}}>电子</a>
                </Space>
            </div>}/>
                <Row gutter={50} style={{ marginTop:"20px" }}>
                    {hotRecommend.map((item)=> {
                        return  (
                        <Col span={6} style={{ marginBottom: "90px" }} key={item.id}>
                            <div>
                                <Image style={{cursor:"pointer"}} preview={false} src={item.picUrl + "?param=140y140"} alt={item.name}/>
                                <span className="hot-recommend-item-play">
                                    <svg style={{margin: "5px 0 0 5px"}} className="icon" viewBox="0 0 1024 1024"
                                         version="1.1"
                                         xmlns="http://www.w3.org/2000/svg" p-id="11465" width="16" height="16"><path
                                        d="M418.67 577.33A18.67 18.67 0 0 0 400 596v186.67a18.67 18.67 0 0 0 37.33 0V596a18.67 18.67 0 0 0-18.66-18.67zM512 633.33A18.67 18.67 0 0 0 493.33 652v85.61a18.67 18.67 0 1 0 37.33 0V652A18.67 18.67 0 0 0 512 633.33zM605.33 577.33A18.67 18.67 0 0 0 586.67 596v186.67a18.67 18.67 0 0 0 37.33 0V596a18.67 18.67 0 0 0-18.67-18.67z"
                                        fill="#cccccc" p-id="11466"></path><path
                                        d="M810.67 522.43v-58c0-164.2-134-297.79-298.67-297.79S213.33 300.26 213.33 464.46v58C129.46 531.76 64 603 64 689.33c0 92.63 75.37 168 168 168a18.67 18.67 0 0 0 18.67-18.67V820h56a18.67 18.67 0 0 0 18.67-18.67v-224a18.67 18.67 0 0 0-18.67-18.67h-56v-90.91c0-0.52 0.06-1 0-1.58v-1.71C250.67 320.84 367.9 204 512 204s261.27 116.78 261.33 260.34V558.67h-56a18.67 18.67 0 0 0-18.67 18.67v224A18.67 18.67 0 0 0 717.33 820h56v18.67A18.67 18.67 0 0 0 792 857.33c92.63 0 168-75.37 168-168 0-86.33-65.46-157.57-149.33-166.9z"
                                        fill="#cccccc" p-id="11467"></path></svg>
                                    <span style={{fontSize: "12px", position: "absolute", top: "4px", left: "25px",fontWeight: 'bold'}}>
                                        {item.playCount > 10000 ? parseInt((item.playCount / 10000).toString()) + "万" : item.playCount}
                                    </span>
                                    <svg   className="icon icon-play" viewBox="0 0 1024 1024" version="1.1"
                                         xmlns="http://www.w3.org/2000/svg" p-id="12736" width="20" height="20"><path
                                        d="M512 97C282.8 97 97 282.8 97 512s185.8 415 415 415 415-185.8 415-415S741.2 97 512 97z m-1 759c-190.5 0-345-154.5-345-345s154.5-345 345-345 345 154.5 345 345-154.5 345-345 345z"
                                        p-id="12737" fill="#cccccc"></path><path
                                        d="M442.1 408.2L621.9 512 442.1 615.8V408.2m-59.9-113.9c-5.2 0-10 4.2-10 10v415.4c0 5.8 4.8 10 10 10 1.7 0 3.4-0.4 5-1.4l359.7-207.7c6.7-3.8 6.7-13.5 0-17.3L387.1 295.7c-1.6-1-3.3-1.4-4.9-1.4z"
                                        p-id="12738" fill="#cccccc"></path></svg>
                                </span>
                                <a className="hot-recommend-item-name">{item.name}</a>
                            </div>
                        </Col>
                        )
                    })}
                </Row>

        </div>
    </div>
}
export default Index;
