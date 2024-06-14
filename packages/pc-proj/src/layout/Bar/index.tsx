import { Breadcrumb, Dropdown, MenuProps } from "antd";
import { User } from "proj-service";
import { UserAvatar } from "@/component/Avatar";

import "./bar.less";

interface BarProps {
  routerTrace: string[];
  userInfo: User.UserLoginInfo;
  onClickChangeUserInfoMenu: () => void;
  onClickExitLoginMenu: () => void;
  onClick2LoginMenu: () => void;
}

function Bar({
  routerTrace,
  userInfo,
  onClickChangeUserInfoMenu,
  onClickExitLoginMenu,
  onClick2LoginMenu,
}: BarProps) {
  const breadCrumbItems = routerTrace.map((trace) => ({ title: trace }));
  const hasLogin = userInfo.role !== "visitor";

  const items: MenuProps["items"] = hasLogin
    ? [
        {
          key: "1",
          label: <p onClick={onClickChangeUserInfoMenu}>修改信息</p>,
        },
        {
          key: "2",
          label: <p onClick={onClickExitLoginMenu}>退出登录</p>,
        },
      ]
    : [
        {
          key: "1",
          label: <p onClick={onClick2LoginMenu}>去登录</p>,
        },
      ];

  return (
    <div className="layout-bar">
      <Breadcrumb items={breadCrumbItems} />

      <div className="user-info">
        <Dropdown menu={{ items }} placement="bottomRight">
          <div className="avatar-wrapper">
            <UserAvatar />
          </div>
        </Dropdown>
      </div>
    </div>
  );
}

export default Bar;
