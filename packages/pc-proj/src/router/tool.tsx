import { SubRoute } from "../global-type/router";
import { AppstoreOutlined, MailOutlined } from "@ant-design/icons";

import { AIChat, Admin } from "../page/tool";

const subRouter: SubRoute = {
  path: "tool",
  label: "实用工具",
  key: "tool",
  icon: <MailOutlined />,
  children: [
    {
      path: "ai",
      label: "ChatGPT",
      key: "tool_ai",
      icon: <AppstoreOutlined />,
      element: <AIChat />,
    },
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
