import { Router } from "@web/service/router";
import App from "@/App";
import Login from "@/page/login";
import PoetryRouter from "./poetry";
import ToolRouter from "./tool";
import AIRouter from "./ai";



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
    {
      path: "*",
      element: <App />,
    },
  ],
  subRouters,
  { basename: import.meta.env.VITE_APP_ROUTER_BASE }
);

export default PCRouter;
