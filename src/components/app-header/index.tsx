import { Layout, Menu, Input, Button } from "antd";
import React, { memo, useState } from "react";
import type { FC, ReactNode } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import "./index.less";
import { SearchOutlined } from "@ant-design/icons";
interface IProps {
  children?: ReactNode;
}
const Home: FC<IProps> = () => {
  const { Header } = Layout;
  const location = useLocation();
  const [selectedKeys, setSelectedKeys] = useState([
    location.pathname.includes("discover") ? "/discover" : location.pathname,
  ]);
  const list = [
    {
      key: "/discover",
      label: "发现音乐",
      path: "/discover",
    },
    {
      key: "/mine",
      label: "我的音乐",
      path: "/mine",
    },
    {
      key: "/focus",
      label: "关注",
      path: "/focus",
    },
    {
      key: "/download",
      label: "下载客户端",
      path: "/download",
    },
  ];
  const navigate = useNavigate();
  const switchTab = (e: any) => {
    setSelectedKeys([e.key]);
    navigate(e.key);
  };
  const [searchInput, setSearchInput] = useState("");
  const search = () => {};
  const onSearchInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchInput(e.target.value);
  };

  return (
    <div className="header">
      <Header
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          gap: "10px",
        }}
      >
        <img
          src="https://y.qq.com/mediastyle/yqq/img/logo.png?max_age=2592000"
          style={{ width: "120px", height: "35px", marginRight: "10px" }}
          alt=""
        />
        <Menu
          theme="dark"
          mode="horizontal"
          selectedKeys={selectedKeys}
          items={list}
          onClick={switchTab}
        ></Menu>
        <Input
          prefix={<SearchOutlined />}
          value={searchInput}
          onPressEnter={search}
          onChange={(e) => onSearchInputChange(e)}
          placeholder="音乐/视频/电台/用户"
        />
        <Button
          shape="round"
          style={{
            backgroundColor: "rgba(36,36,36)",
            color: "#ccc",
          }}
        >
          创作者中心
        </Button>
        <Button
          style={{
            border: "none",
            fontSize: "12px",
            color: "#787878",
            backgroundColor: "transparent",
          }}
        >
          登录
        </Button>
      </Header>
    </div>
  );
};
export default memo(Home);
