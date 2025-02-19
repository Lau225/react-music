import React, { useEffect, useState } from 'react'
import './index.less'
import Title from "@/components/title";
import { Carousel,ConfigProvider,Image } from 'antd';
import {useAppDispatch} from "@/store";
import {fetchNewAlbumAction, IAlbum} from "../../store/recommend";
import {useAppSelector} from "@/store";
const Index = () => {
    const dispatch = useAppDispatch()
    const {newAlbum} = useAppSelector((state) => ({
        newAlbum: state.recommend.newAlbum
    }))
    const [list,setList] = useState<Array<IAlbum[]>>([])
    useEffect(() => {
        dispatch(fetchNewAlbumAction())
    }, [dispatch]);
    useEffect(() => {
        const newList = []
        for(let i=0;i<newAlbum.length;i+=4){
            newList.push([...newAlbum.slice(i,i+4)])
        }
        console.log(newList)
        setList(newList)
    }, [newAlbum]);
    return <div>
        <Title moreLink="/discover/songs">
            <div style={{display: 'flex', alignItems: 'center'}}>
                <div style={{fontSize: '20px', fontWeight: 'normal'}}>新碟上架</div>
            </div>
        </Title>
        <ConfigProvider
            theme={{
                components: {
                    Carousel: {
                        arrowSize: 20,
                        arrowOffset:5
                    },
                },
            }}
        >
        <div style={{border: '1px solid #cccccc',marginTop: '20px'}} className="new-album-container">
            <Carousel autoplay arrows={true} dots={false}>
                {list.map(item => {
                    return(
                        <div className="new-album" key={item[0].id}>
                            <div className="new-album-list">
                                {item.map(album => {
                                    return (
                                        <div className="new-album-item" key={album.id}>
                                            <Image preview={false}
                                                   style={{cursor: 'pointer'}}
                                                   src={album.blurPicUrl + '?param=100y100'}/>
                                            <a style={{fontSize:"12px",display:"block",width:"118px",height:"18.84px"}}>{album.name}</a>
                                            <a style={{fontSize:"12px",display:"block",width:"118px",height:"18.84px"}}>{album.artist.name}</a>
                                        </div>
                                    )
                                })}
                            </div>
                        </div>
                    )
                })}
            </Carousel>
        </div>
        </ConfigProvider>
    </div>
}
export default Index;
