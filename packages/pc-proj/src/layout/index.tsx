import { Outlet } from "react-router-dom";
import { MenuProps, message } from "antd";
import { Suspense, useState } from "react";
import { WebType } from "web-common";
import { useUserLoginInfo, useUserLoginDispatch } from "@web/context/user";
import { useUserRouter } from "@web/service/router";
import Router from "@/router";
import Menu from "./Menu";
import Bar from "./Bar";
import UserInfoDialog from "./UserInfoDialog";

import "./layout.less";



type UserLoginDisplayInfo = WebType.User.UserLoginDisplayInfo;

export default function Layout() {
  const userInfo = useUserLoginInfo();
  const loginDispatch = useUserLoginDispatch();

  // 菜单功能
  const { menuItems, curRouteTrace, navigateSubRoute, navigate } =
    useUserRouter(Router, userInfo.role);

  const handleClickMenu: MenuProps["onClick"] = (e) => {
    navigateSubRoute(e.keyPath.reverse());
  };

  // layout-bar功能
  const [userInfoDialogVisible, setUserInfoDialogVisible] = useState(false);

  const hanleClickExitLoginMenu = async () => {
    try {
      await loginDispatch({ type: "exit" });
      message.info("退出成功~");
    } catch {
      message.error("退出失败~");
    }
  };

  const handleComfirmChangeUserInfo = async (info: UserLoginDisplayInfo) => {
    try {
      await loginDispatch({ type: "update_display_info", userInfo: info });
      message.success("修改成功~");
      setUserInfoDialogVisible(false);
    } catch {
      message.error("修改失败~");
    }
  };

  return (
    <div className="layout-page">
      <div className="aside">
        <div className="logo">{/* <AppleOutlined /> */}</div>
        <Menu
          keys={curRouteTrace.map((item) => item.key)}
          menuItems={menuItems}
          onClickMenu={handleClickMenu}
        />
      </div>
      <div className="main">
        <Bar
          routerTrace={curRouteTrace.map((item) => item.label)}
          userInfo={userInfo}
          onClickChangeUserInfoMenu={() => setUserInfoDialogVisible(true)}
          onClick2LoginMenu={() => navigate("/login")}
          onClickExitLoginMenu={hanleClickExitLoginMenu}
        />
        {userInfoDialogVisible && (
          <UserInfoDialog
            visible={userInfoDialogVisible}
            userName={userInfo.userName}
            role={userInfo.role}
            avatar={userInfo.avatar}
            onCloseModal={() => setUserInfoDialogVisible(false)}
            onConfirm={handleComfirmChangeUserInfo}
          />
        )}
        <div className="content">
          <Suspense fallback={<></>}>
            <Outlet />
          </Suspense>
        </div>
      </div>
    </div>
  );
}
