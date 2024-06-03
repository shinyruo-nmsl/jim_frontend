import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { MenuProps, message } from "antd";
import { useState } from "react";

import Router from "../router";
import { UserLoginDisplayInfo } from "../global-type/user";
import { useUserLoginInfo, useUserLoginDispatch } from "../context/user";

import Menu from "./Menu";
import Bar from "./Bar";
import UserInfoDialog from "./UserInfoDialog";

import "./layout.less";

export default function Layout() {
  const userInfo = useUserLoginInfo();
  const loginDispatch = useUserLoginDispatch();

  // 菜单功能
  const menuItems = Router.getMenuRoutes(userInfo.role);
  const { pathname } = useLocation();
  const naigate = useNavigate();

  const [trace, setTrace] = useState(
    Router.search(pathname.split("/").filter(Boolean), "path")
  );
  const keys = trace.map((r) => r.key);
  const labels = trace.map((r) => r.label);

  const handleClickMenu: MenuProps["onClick"] = (e) => {
    const trace = Router.search(e.keyPath.reverse(), "key");
    setTrace(trace);
    naigate(`/${trace.map((r) => r.path).join("/")}`);
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
        <Menu keys={keys} menuItems={menuItems} onClickMenu={handleClickMenu} />
      </div>
      <div className="main">
        <Bar
          routerTrace={labels}
          userInfo={userInfo}
          onClickChangeUserInfoMenu={() => setUserInfoDialogVisible(true)}
          onClick2LoginMenu={() => naigate("/login")}
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
          <Outlet />
        </div>
      </div>
    </div>
  );
}
