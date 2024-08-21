import { NavBar, SideBar, Dialog } from "antd-mobile";
import { MoreOutline, ExclamationCircleFill } from "antd-mobile-icons";
import Router from "@/router";
import { Suspense, useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import { useUserLoginInfo } from "@web/context/user";
import { useUserRouter } from "@web/service/router";
import { HttpEventEmitter } from "@util/http";



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

  useEffect(() => {
    const handler = () => {
      Dialog.alert({
        header: (
          <ExclamationCircleFill
            style={{
              fontSize: 64,
              color: "var(--adm-color-warning)",
            }}
          />
        ),
        content: (
          <>
            <div>使用此功能需要登录</div>
          </>
        ),
        onConfirm: () => {
          navigate("/login");
        },
      });
    };

    HttpEventEmitter.registHandler("code_401", handler);

    return () => HttpEventEmitter.removeHandler("code_401", handler);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="flex flex-col w-full h-full">
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
            setSideBarVisible(false);
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
