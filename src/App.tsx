import { Link, Outlet } from "react-router-dom";


function App() {

  return (
    <>
      <div>
        <div className="header">
          <Link to='/discover'>发现音乐</Link>
          <Link to='/focus'>关注</Link>
          <Link to='/download'>下载客户端</Link>
          <Link to='/mine'>我的音乐</Link>
        </div>
        <Outlet/>
      </div>
    </>
  )
}

export default App
