import { createBrowserRouter } from "react-router-dom";
/* eslint-disable react-refresh/only-export-components */
import React from "react";

const TextGener = React.lazy(() => import("@/page/ai/textGener"));
// const ImgParser = React.lazy(() => import("@/page/ai/imgParser"));

const H5Router = createBrowserRouter([
  {
    path: "textGener",
    element: <TextGener />,
  },
  // {
  //   path: "imgParser",
  //   element: <ImgParser />,
  // },
]);

export default H5Router;
