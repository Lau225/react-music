import React, { Suspense } from "react";
import { Link, Outlet } from "react-router-dom";
const Discover = () => {
  return (
    <div>
      <Link to="/discover/recommend">推荐</Link>
      <Link to="/discover/ranking">排行榜</Link>
      <Link to="/discover/djradio">电台</Link>
      <Link to="/discover/singer">歌手</Link>
      <Link to="/discover/songs">新碟上架</Link>
      <Suspense fallback={<div>Loading...</div>}>
        <Outlet />
      </Suspense>
    </div>
  );
};

export default Discover;
