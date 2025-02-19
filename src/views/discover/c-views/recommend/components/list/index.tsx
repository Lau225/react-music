import React, { useEffect } from 'react'
import './index.less'
import Title from "@/components/title";
import ListItem from "./components/list-item";
import {Image} from "antd";
import {useAppDispatch} from "@/store";
import {fetchRankingAction} from "../../store/recommend";
import {useAppSelector} from "@/store";
const Index = () => {
    const dispatch = useAppDispatch()
    const {ranking} = useAppSelector((state)=>({
        ranking: state.recommend.ranking
    }))
    useEffect(() => {
        dispatch(fetchRankingAction())
    }, [dispatch]);
    return (
    <div style={{ marginTop: '30px' }}>
        <Title moreLink="/discover/ranking">
            <div style={{display: 'flex', alignItems: 'center'}}>
                <div style={{fontSize: '20px', fontWeight: 'normal'}}>榜单</div>
            </div>
        </Title>
        <div style={{ marginTop: '20px',display: 'flex' }} className="list-container">
            <ListItem dataList={ranking[0]}/>
            <ListItem dataList={ranking[1]}/>
            <ListItem dataList={ranking[2]}/>
        </div>
    </div>
    )
}
export default Index;
