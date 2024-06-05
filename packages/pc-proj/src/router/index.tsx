import { createBrowserRouter } from "react-router-dom";

import { SubRoute } from "@/global-type/router";
import { Role } from "@/global-type/user";
import App from "@/App";

import Login from "@/page/login";
import PoetryRouter from "./poetry";
import ToolRouter from "./tool";

class Router {
  static readonly subRouters = [PoetryRouter, ToolRouter];
  static readonly router = createBrowserRouter([
    {
      path: "/login",
      element: <Login />,
    },
    {
      path: "/",
      element: <App />,
      children: this.subRouters,
    },
  ]);

  private static _getMenuRoutes(
    _children: SubRoute[],
    role?: Role
  ): SubRoute[] | undefined {
    const children = _children.filter(
      (c) => !role || !c.auths || c.auths.includes(role)
    );

    return children && children.length
      ? children
          .filter((r) => typeof r.show === "undefined" || r.show)
          .map((r) => ({
            ...r,
            children: this._getMenuRoutes(r.children || [], role),
          }))
      : undefined;
  }

  static getMenuRoutes(role?: Role) {
    return this._getMenuRoutes(this.subRouters, role);
  }

  private static _search(
    paths: string[],
    key: "key" | "path",
    trace: SubRoute[],
    subRoutes: SubRoute[]
  ): SubRoute[] {
    if (!paths.length) return trace;
    const path = paths[0];
    const route = subRoutes.find((r) => r[key] === path);
    if (!route) return trace;
    if (paths.length === 1 || !route.children) return [...trace, route];
    return this._search(paths.slice(1), key, [...trace, route], route.children);
  }

  static search(paths: string[], key: "key" | "path") {
    return this._search(paths, key, [], this.subRouters);
  }
}

export default Router;
