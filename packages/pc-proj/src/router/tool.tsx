/* eslint-disable react-refresh/only-export-components */
import React from "react";
import { AppstoreOutlined, MailOutlined } from "@ant-design/icons";
import { WebType } from "web-common";

type SubRoute = WebType.Router.SubRoute;

const Admin = React.lazy(() => import("@/page/tool/admin"));

const subRouter: SubRoute = {
  path: "tool",
  label: "实用工具",
  key: "tool",
  icon: <MailOutlined />,
  children: [
    {
      path: "admin",
      label: "管理员",
      key: "tool_admin",
      auths: ["admin"],
      icon: <AppstoreOutlined />,
      element: <Admin />,
    },
  ],
};

export default subRouter;
