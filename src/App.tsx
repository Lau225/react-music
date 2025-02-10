import { Suspense } from "react";
import { Outlet } from "react-router-dom";
import AppHeader from "./components/app-header";
import { Layout } from "antd";
import React from "react";
function App() {
  const { Content, Footer } = Layout;
  return (
    <>
      <Layout style={{minWidth: "1200px"}}>
        <AppHeader />
        <Content style={{ backgroundColor: "#ffffff" }}>
          <Suspense fallback={<div>Loading...</div>}>
            <Outlet />
          </Suspense>
        </Content>
        <Footer style={{ textAlign: "center" }}>
          <span style={{ color: "#666666", fontSize: "12px" }}>
            网易公司版权所有©1997-2025杭州乐读科技有限公司运营：浙网文[2024]
            0900-042号 浙公网安备 33010802013307号 算法服务公示信息
          </span>
        </Footer>
      </Layout>
    </>
  );
}

export default App;
