import { AppstoreOutlined, MailOutlined } from "@ant-design/icons";
import { SubRoute } from "@/global-type/router";
import { AIChat, AIImage, Admin } from "@/page/tool";

const subRouter: SubRoute = {
  path: "tool",
  label: "实用工具",
  key: "tool",
  icon: <MailOutlined />,
  children: [
    {
      path: "chatgpt",
      label: "ChatGPT",
      key: "chatgpt",
      icon: <AppstoreOutlined />,
      element: <AIChat />,
    },
    {
      path: "aiImage",
      label: "AI图像",
      key: "aiImage",
      icon: <AppstoreOutlined />,
      element: <AIImage />,
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
