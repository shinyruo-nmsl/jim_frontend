import { NavBar, SideBar } from "antd-mobile";
import { MoreOutline } from "antd-mobile-icons";
import Router from "@/router";
import { Suspense, useState } from "react";
import { Outlet } from "react-router-dom";
import { WebContext, WebService } from "web-common";

const {
  User: { useUserLoginInfo },
} = WebContext;

const {
  Router: { useUserRouter },
} = WebService;

function Layout() {
  const userInfo = useUserLoginInfo();

  const { leafRoutes, curRouteTrace, navigate, navigateSubRoute } =
    useUserRouter(Router, userInfo.role);

  const [sideBarVisible, setSideBarVisible] = useState(false);

  const right = (
    <div className="text-24 flex justify-end">
      <MoreOutline onClick={() => setSideBarVisible(true)} />
    </div>
  );

  const title = curRouteTrace[curRouteTrace.length - 1]?.label;

  return (
    <div className="flex flex-col w-[100vw] h-[100vh]">
      <NavBar
        className="w-full flex-none"
        right={right}
        onBack={() => navigate(-1)}
      >
        {title}
      </NavBar>
      <div
        className="w-full flex-auto overflow-y-auto overflow-x-hidden"
        onClick={() => setSideBarVisible(false)}
      >
        <Suspense>
          <Outlet />
        </Suspense>
      </div>
      {sideBarVisible && (
        <SideBar
          className="fixed right-0 top-0 h-full w-[40%] z-prioty"
          activeKey={curRouteTrace.map((item) => item.path).join("/")}
          onChange={(key) => {
            navigateSubRoute(key.split("/"), "path");
          }}
        >
          {leafRoutes.map((item) => (
            <SideBar.Item key={item.paths.join("/")} title={item.label} />
          ))}
        </SideBar>
      )}
    </div>
  );
}

export default Layout;
