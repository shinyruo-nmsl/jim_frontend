import { NavBar, SideBar, Space } from "antd-mobile";
import { MoreOutline } from "antd-mobile-icons";
import Router from "@/router";

function Layout() {
  return (
    <div className="flex flex-col w-[100vw] h-[100vh]">
      <NavBar className="w-full flex-none" right={<MoreOutline />}>
        Title
      </NavBar>
      <div className="w-full flex-auto overflow-y-auto"></div>
    </div>
  );
}

export default Layout;
