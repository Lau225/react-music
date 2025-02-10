import React, { useState } from "react";
import { Suspense } from "react";
import {Outlet, useLocation, useNavigate } from "react-router-dom";
import "./index.less";
import { Menu } from "antd";
const Discover = () => {
  const location = useLocation();
  console.log(location);

  const navigate = useNavigate();
  const [selectedKeys, setSelectedKeys] = useState<string[]>([
    location.pathname == "/discover"
      ? "/discover/recommend"
      : location.pathname,
  ]);
  const list = [
    {
      key: "/discover/recommend",
      label: "推荐",
      path: "/discover/recommend",
    },
    {
      key: "/discover/ranking",
      label: "排名",
      path: "/discover/ranking",
    },
    {
      key: "/discover/djradio",
      label: "电台",
      path: "/discover/djradio",
    },
    {
      key: "/discover/singer",
      label: "歌手",
      path: "/discover/singer",
    },
    {
      key: "/discover/songs",
      label: "新碟上架",
      path: "/discover/songs",
    },
  ];
  const switchTab = (e: any) => {
    setSelectedKeys([e.key]);
    console.log(e.key);

    navigate(e.key);
  };

  return (
    <div
      className="body"
      style={{
        height: "100%",
        boxSizing: "border-box",
      }}
    >
      <div
        style={{
          width: "100%",
          display: "flex",
          justifyContent: "space-around",
          height: "35px",
          backgroundColor: "#C20C0C",
          fontSize: "12px",
        }}
      >
        <Menu
          theme="dark"
          mode="horizontal"
          selectedKeys={selectedKeys}
          items={list}
          style={{
            height: "80%",
            color: "#fff",
            lineHeight: "29px",
            display: "flex",
            alignItems: "stretch",
            gap: "10px",
            fontSize: "12px",
            margin: "auto 0",
          }}
          onClick={switchTab}
        ></Menu>
      </div>
      <div style={{ backgroundColor: "#F5F5F5"}}>
        <Suspense fallback={<div>Loading...</div>}>
          <Outlet />
        </Suspense>
      </div>
    </div>
  );
};

export default Discover;
