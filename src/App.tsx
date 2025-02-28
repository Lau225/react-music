import { Suspense, useEffect } from "react";
import { Outlet } from "react-router-dom";
import AppHeader from "./components/app-header";
import {FloatButton, Layout } from "antd";
import React from "react";
import PlayerBar from "./views/player/player-bar";
import {useAppDispatch, useAppSelector} from "./store";
import {fetchCurrentSongAction} from "./views/player/store/play";
function App() {
  const { Content, Footer } = Layout;
  // 获取某一首歌
  const dispatch = useAppDispatch()
  const {playSongList} = useAppSelector((state) => ({
    playSongList: state.player.playSongList,
  }))
  useEffect(() => {
    if(playSongList.length !== 0){
      dispatch(fetchCurrentSongAction(playSongList[0].id))
    }
  }, [dispatch]);
  return (
    <>
      <div>
        <Layout style={{minWidth: "1200px"}}>
          <AppHeader />
          <Content style={{ backgroundColor: "#ffffff" }}>
            <Suspense fallback={<div>Loading...</div>}>
              <Outlet />
              <FloatButton.BackTop visibilityHeight={0} />
            </Suspense>
          </Content>
          <Footer style={{ textAlign: "center" }}>
          <span style={{ color: "#666666", fontSize: "12px" }}>
            网易公司版权所有©1997-2025杭州乐读科技有限公司运营：浙网文[2024]
            0900-042号 浙公网安备 33010802013307号 算法服务公示信息
          </span>
          </Footer>
        </Layout>
      </div>
      <PlayerBar/>
    </>
  );
}

export default App;
