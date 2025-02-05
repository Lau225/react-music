import { Layout, Menu } from "antd";
import React, { memo } from "react";
import type { FC, ReactNode } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./index.css";
interface IProps {
  children?: ReactNode;
}
const Home: FC<IProps> = () => {
  const { Header } = Layout;
  const list = [
    {
      key: 1,
      label: "发现音乐",
      path: "/discover",
    },
    {
      key: 2,
      label: "我的音乐",
      path: "/mine",
    },
    {
      key: 3,
      label: "关注",
      path: "/focus",
    },
    {
      key: 4,
      label: "下载客户端",
      path: "/download",
    },
  ];
  const navigate = useNavigate();
  const switchTab = (e: any) => {
    navigate(list.find((item) => item.key == e.key)?.path);
  };
  const logo = "";
  return (
    <div className="header">
      <Header style={{ display: "flex", justifyContent: "center" }}>
        <img src={logo} alt="" />
        <Menu
          theme="dark"
          mode="horizontal"
          defaultSelectedKeys={["1"]}
          items={list}
          style={{
            display: "flex",
            alignItems: "center",
          }}
          onClick={switchTab}
        ></Menu>
      </Header>
    </div>
  );
};
export default memo(Home);
