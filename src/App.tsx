import { Suspense } from "react";
import { Link, Outlet } from "react-router-dom";
import { useAppSelector } from "./store";
function App() {
  const { count } = useAppSelector((state) => ({
    count: state.counter.count,
  }));
  return (
    <>
      <div>
        <div className="header">
          <Link to="/discover">发现音乐</Link>
          <Link to="/focus">关注</Link>
          <Link to="/download">下载客户端</Link>
          <Link to="/mine">我的音乐</Link>
        </div>
        <h2>当前计数{count}</h2>
        <Suspense fallback={<div>Loading...</div>}>
          <Outlet />
        </Suspense>
      </div>
    </>
  );
}

export default App;
