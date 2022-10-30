import { memo, Suspense } from "react";
import { NavLink, Outlet } from "react-router-dom";

export const Top = (props) => {
  return (
    <div className="uno-top">
      {props.children}
    </div>
  )
}

export const Tab = (props) => {
  return (
    <div className="uno-tab">
      {props.children}
    </div>
  )
}

export const TabItem = (props) => {
  return (
    <div className="uno-tab-item">
      {props.children}
    </div>
  )
}

function Home(props) {
  return (
    <>
      <Top>
        <span className="iconfont menu text-[25px]">&#xe65c;</span>
        <span className="title">Web App</span>
        <span className="iconfont search text-[25px]">&#xe62b;</span>
      </Top>
      <Tab>
        <NavLink className={({ isActive }) => (isActive ? " selected" : "")} to="/"><TabItem><span > 推荐 </span></TabItem></NavLink>
        <NavLink className={({ isActive }) => (isActive ? " selected" : "")} to="/singers"><TabItem><span > 歌手 </span></TabItem></NavLink>
        <NavLink className={({ isActive }) => (isActive ? " selected" : "")} to="/rank"><TabItem><span > 排行榜 </span></TabItem></NavLink>
      </Tab>
      <Suspense fallback={<div>Loading...</div>}>
        <Outlet />
      </Suspense>
    </>
  )
}

export default memo(Home)