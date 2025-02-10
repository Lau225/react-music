import React, { memo, useEffect, useState } from "react";
import type { FC, ReactNode } from "react";
import { Carousel, ConfigProvider, Image } from "antd";
import { useAppDispatch } from "@/store";
import {fetchBannerDataAction} from "./store/recommend";
import {useAppSelector} from "@/store";
import "./index.less";
interface IProps {
  children?: ReactNode;
}
const Index: FC<IProps> = () => {
  const dispatch = useAppDispatch();
  const {banners} = useAppSelector((state) => ({
    banners:state.recommend.banners
  }))
  useEffect(() => {
    dispatch(fetchBannerDataAction())
  }, []);
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
  );
};
export default memo(Index);
