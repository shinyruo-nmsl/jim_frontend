/* eslint-disable react-refresh/only-export-components */
import React from "react";
import { AppstoreOutlined, MailOutlined } from "@ant-design/icons";
import { WebType } from "web-common";

type SubRoute = WebType.Router.SubRoute;

const TextGener = React.lazy(() => import("@/page/ai/textGener"));
const ImgGener = React.lazy(() => import("@/page/ai/imgGener"));
const ImgParser = React.lazy(() => import("@/page/ai/imgParser"));
const PPTGener = React.lazy(() => import("@/page/ai/pptGener"));
const PPTParser = React.lazy(() => import("@/page/ai/pptParser"));

const subRouter: SubRoute = {
  path: "assistant",
  label: "智能助手",
  key: "assistant",
  icon: <MailOutlined />,
  children: [
    {
      path: "textGener",
      label: "文本生成",
      key: "text_gener",
      icon: <AppstoreOutlined />,
      element: <TextGener />,
    },
    {
      path: "imgGener",
      label: "图片生成",
      key: "img_gener",
      icon: <AppstoreOutlined />,
      element: <ImgGener />,
    },
    {
      path: "imgParser",
      label: "图片解析",
      key: "img_parser",
      icon: <AppstoreOutlined />,
      element: <ImgParser />,
    },
    {
      path: "pptGener",
      label: "PPT生成",
      key: "ppt_gener",
      icon: <AppstoreOutlined />,
      element: <PPTGener />,
    },
    {
      path: "pptParser",
      label: "PPT解析",
      key: "ppt_parser",
      icon: <AppstoreOutlined />,
      element: <PPTParser />,
    },
  ],
};

export default subRouter;
