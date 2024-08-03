import { WebService } from "web-common";
import App from "@/App";
import Login from "@/page/login";
import PoetryRouter from "./poetry";
import ToolRouter from "./tool";
import AIRouter from "./ai";

const isProd = import.meta.env.MODE === "production";

const {
  Router: { Router },
} = WebService;

const subRouters = [AIRouter, PoetryRouter, ToolRouter];

const PCRouter = new Router(
  [
    {
      path: "/login",
      element: <Login />,
    },
    {
      path: "/",
      element: <App />,
      children: subRouters,
    },
  ],
  subRouters,
  { basename: isProd ? "/pc/" : "/" }
);

export default PCRouter;
