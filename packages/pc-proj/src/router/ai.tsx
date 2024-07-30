import { AppstoreOutlined, MailOutlined } from "@ant-design/icons";
import { SubRoute } from "@/global-type/router";
import { PPTParser, PPTGener } from "@/page/ai";

const subRouter: SubRoute = {
  path: "ai",
  label: "智能助手",
  key: "ai",
  icon: <MailOutlined />,
  children: [
    {
      path: "pptParser",
      label: "PPT解析",
      key: "ppt_parser",
      icon: <AppstoreOutlined />,
      element: <PPTParser />,
    },
    {
      path: "pptGener",
      label: "PPT生成",
      key: "ppt_gener",
      icon: <AppstoreOutlined />,
      element: <PPTGener />,
    },
  ],
};

export default subRouter;
