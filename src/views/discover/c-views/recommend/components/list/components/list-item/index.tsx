import React from 'react'
import './index.less'
import { Image } from 'antd';
const Index = ({dataList}) => {
    const mouseEnter = (e) => {
        console.log("mouseEnter",e)
    }
    const mouseLeave = (e) => {
        console.log("mouseLeave",e)
    }
    return(
    <div className="list-item">
        <div className="list-item-header">
            <Image preview={false} src={dataList?.coverImgUrl +'?param=80y80'}/>
            <div style={{ padding:'3px',marginLeft: "10px" }}>
                <a style={{ fontSize: '14px',fontWeight: 'bold', color: '#333333',fontFamily: "Arial, Helvetica, sans-serif" }}>
                    {dataList?.name}
                </a>
                <div style={{height: "22px",display:"flex",marginTop: "7px"}}>
                    <a
                        className="icon-plays"
                    >
                        播放
                    </a>
                    <a className="icon-like">
                        收藏
                    </a>
                </div>
            </div>
        </div>
        <div className="list-item-body">
        {
            dataList?.tracks.slice(0,10).map((item:any,index:number) => {
                return (
                    <div className="item-test" onMouseEnter={e => mouseEnter(e)} onMouseLeave={e => mouseLeave(e)}  style={{display: "flex", alignItems: "center"}} key={item.id}>
                        <span className="list-number" style={{color: index + 1 > 3 ? '#333' : '#c10d0c'}}>
                            {index + 1}
                        </span>
                        <a className="list-item-desc">
                            {item.name}
                        </a>
                        <div className="item-icon-list">
                            <a className="item-icon-plays">播放</a>
                            <a className="item-icon-like">收藏</a>
                        </div>
                    </div>
                )
            })
        }
        <a className="list-item-desc" style={{marginLeft:"120px"}}>
            查看全部&gt;
        </a>
        </div>
    </div>
    )
}
export default Index;
