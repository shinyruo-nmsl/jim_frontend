/* eslint-disable react-refresh/only-export-components */
import React from "react";
import { WebType } from "web-common";

type SubRoute = WebType.Router.SubRoute;

const PoetrySearch = React.lazy(() => import("@/page/poetry"));

const subRouter: SubRoute = {
  path: "poetry",
  label: "诗词接花令",
  key: "poetry",
  children: [
    {
      path: "search",
      label: "诗词检索",
      key: "poetry_search",
      element: <PoetrySearch />,
    },
  ],
};

export default subRouter;
