/* eslint-disable react-refresh/only-export-components */
import React from "react";
import { WebType } from "web-common";

type SubRoute = WebType.Router.SubRoute;

const TextGener = React.lazy(() => import("@/page/ai/textGener"));
const ImgParser = React.lazy(() => import("@/page/ai/imgParser"));

const subRouter: SubRoute = {
  path: "assistant",
  label: "智能助手",
  key: "assistant",
  children: [
    {
      path: "textGener",
      label: "文本生成",
      key: "text_gener",
      element: <TextGener />,
    },
    {
      path: "imgParser",
      label: "图片解析",
      key: "img_parser",
      element: <ImgParser />,
    },
  ],
};

export default subRouter;
