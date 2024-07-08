import { AppstoreOutlined, MailOutlined } from "@ant-design/icons";
import { SubRoute } from "@/global-type/router";
import { AIChat, AIGNImage, AIPSImage, Admin } from "@/page/tool";

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
      path: "aiGNImage",
      label: "AI生成图像",
      key: "aiGNImage",
      icon: <AppstoreOutlined />,
      element: <AIGNImage />,
    },
    {
      path: "aiPSImage",
      label: "AI解析图像",
      key: "aiPSImage",
      icon: <AppstoreOutlined />,
      element: <AIPSImage />,
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
