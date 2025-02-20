import React, { memo, useEffect, useState } from "react";
import type { FC, ReactNode } from "react";
import {Button, Card, Carousel, Col, ConfigProvider, Divider, Image, Row } from "antd";
import { useAppDispatch } from "@/store";
import {fetchArtistAction, fetchBannerDataAction} from "./store/recommend";
import {useAppSelector} from "@/store";
import HotRecommend from "./components/hot-recommend";
import "./index.less";
import NewAlbum from "./components/new-album";
import LoginCard from "./components/login-card";
import List from "./components/list";
interface IProps {
  children?: ReactNode;
}
const Index: FC<IProps> = () => {
  const dispatch = useAppDispatch();
  const {banners,artist} = useAppSelector((state) => ({
    banners:state.recommend.banners,
    artist:state.recommend.artist
  }))
  useEffect(() => {
    dispatch(fetchBannerDataAction())
    dispatch(fetchArtistAction())
  }, [dispatch]);
  useEffect(() => {
    if (banners.length > 0){
      setBackgroundImage(banners[0].imageUrl  + "?imageView&blur=40x20")
    }
  }, [banners]);
  const [backgroundImage, setBackgroundImage] = useState("")
  const change = (from: number, to: number) => {
    setBackgroundImage(banners[to].imageUrl  + "?imageView&blur=40x20")
  }
  return (
      <div>
        <div className="recommend-container" style={{backgroundImage: `url(${backgroundImage})`,}}>
          <div style={{width: "1000px", margin: "0 auto", position: "relative"}}>
            <ConfigProvider
                theme={{
                  components: {
                    Carousel: {
                      arrowSize: 40,
                      arrowOffset: -80
                    },
                  },
                }}
            >
              <Carousel effect="fade" arrows dots={false} autoplay style={{width: "100%"}} beforeChange={change}>
                {banners.map((item) => {
                  return (
                      <Image
                          width="730px"
                          style={{minWidth: "900px"}}
                          height="284px"
                          src={item.imageUrl}
                          preview={false}
                          key={item.imageUrl}
                      />
                  );
                })}
              </Carousel>
            </ConfigProvider>
            <div style={{position: "absolute", top: "0", left: "73%", height: "284px", overflow: "hidden"}}>
              <Image
                  src="https://s2.music.126.net/style/web2/img/index/download.png?48a5da610a027ac0e54f16b1aa848ec3"
                  preview={false}
                  width="250px"
                  height="353px"
              />
            </div>
          </div>
        </div>
        <div style={{width:"982px",margin:"0 auto"}}>
          <Row>
            <Col span={17.5}>
              <Card style={{marginLeft:"-10px",padding:"20px 20px 40px",width:"733px",borderRadius:"0"}}>
                <HotRecommend/>
                <NewAlbum/>
                <List/>
              </Card>
            </Col>
            <Col span={6.5}>
              <Card style={{borderRadius:"0",width:"249px",height:"1361.5px"}}>
                <LoginCard/>
                <div className="artist-list">
                  <div style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    borderBottom: "1px solid #ccc",
                    paddingBottom: "5px"
                  }}>
                    <span style={{fontSize: "12px", color: "#333333", fontWeight: "bold"}}>入驻歌手</span>
                    <a className="more-link">查看全部&gt;</a>
                  </div>
                  {artist.map(item => {
                    return (
                        <div className="artist-item">
                          <Image src={item.picUrl + "?param=62y60"}/>
                          <div className="artist-info">
                            <div style={{color: "#333333", fontWeight: "bold"}}>{item.name}</div>
                            <div style={{
                              width: "119px",
                              fontSize: "12px",
                              color: "#666666",
                              overflow: "hidden",
                              textOverflow: "ellipsis",
                              whiteSpace: "nowrap",
                              wordWrap: "normal",
                              marginTop: "5px"
                            }}>
                              {item.alias.join(',')}
                            </div>
                          </div>
                        </div>
                    )
                  })}
                  <ConfigProvider theme={{
                        components: {
                          Button: {
                            defaultBg: "rgb(210,9,15)",
                            defaultColor: "#fff",
                            defaultHoverBg: "rgba(193,9,14,0.8)",
                            defaultBorderColor: "rgba(193,9,14)",
                            defaultHoverColor: "#fff",
                            defaultHoverBorderColor: "rgba(193,9,14)",
                            defaultActiveBg: "rgba(193,9,14,0.8)",
                            defaultActiveColor: "#fff",
                            defaultActiveBorderColor: "rgba(193,9,14)",
                          },
                        },
                      }}>
                    <Button style={{
                      height: "31px",
                      width: "100%",
                      fontSize: "12px",
                      marginTop: "13px",
                      fontWeight: "bold"
                    }}>
                      申请成为网易云音乐人
                    </Button>
                  </ConfigProvider>
                  <div style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    borderBottom: "1px solid #ccc",
                    paddingBottom: "5px",
                    marginTop: "30px"
                  }}>
                    <span style={{fontSize: "12px", color: "#333333", fontWeight: "bold"}}>热门主播</span>
                  </div>
                </div>
              </Card>
            </Col>
          </Row>
        </div>
      </div>
  );
};
export default memo(Index);
