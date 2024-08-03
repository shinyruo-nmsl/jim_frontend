import { WebService } from "web-common";
import { Navigate } from "react-router-dom";
import { WebType } from "web-common";
import Layout from "@/layout";
import PoetryRouter from "./poetry";
import AIRouter from "./ai";

type SubRoute = WebType.Router.SubRoute;

const {
  Router: { Router },
} = WebService;

const subRouters: SubRoute[] = [
  {
    path: "home",
    label: "首页",
    key: "home",
    element: <Layout />,
    children: [AIRouter, PoetryRouter],
  },
];

const H5Router = new Router(
  [
    // {
    //   path: "/login",
    //   element: <Login />,
    // },
    {
      path: "/",
      element: <Navigate to="/home/poetry/search" />,
    },
    ...subRouters,
  ],
  subRouters
);

export default H5Router;
