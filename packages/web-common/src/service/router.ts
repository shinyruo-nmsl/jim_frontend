import {
  RouteObject,
  createBrowserRouter,
  useNavigate,
  useLocation,
} from "react-router-dom";
import { useState, useEffect } from "react";
import { User } from "proj-service";
import { SubRoute } from "@web/type/router";

export class Router {
  readonly router: ReturnType<typeof createBrowserRouter>;

  constructor(
    readonly routers: RouteObject[],
    readonly subRouters: SubRoute[],
    opts: { basename?: string } = {}
  ) {
    this.router = createBrowserRouter(this.routers, opts);
  }

  private _getMenuRoutes(
    _children: SubRoute[],
    role?: User.Role
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

  getMenuRoutes(role?: User.Role) {
    return this._getMenuRoutes(this.subRouters, role);
  }

  private _getMenuLeafRoutes(
    _children: SubRoute[],
    role?: User.Role,
    parentPath: string[] = []
  ): (SubRoute & { paths: string[] })[] {
    const children = _children.filter(
      (c) => !role || !c.auths || c.auths.includes(role)
    );

    return children
      .filter((r) => typeof r.show === "undefined" || r.show)
      .flatMap((r) =>
        r.children
          ? this._getMenuLeafRoutes(r.children, role, [...parentPath, r.path])
          : { ...r, paths: [...parentPath, r.path] }
      );
  }

  getMenuLeafRoutes(role?: User.Role) {
    return this._getMenuLeafRoutes(this.subRouters, role);
  }

  private _search(
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

  search(paths: string[], key: "key" | "path") {
    return this._search(paths, key, [], this.subRouters);
  }
}

export function useUserRouter(router: Router, userRole: User.Role) {
  const navigate = useNavigate();
  const { pathname } = useLocation();

  const [trace, setTrace] = useState(
    router.search(pathname.split("/").filter(Boolean), "path")
  );

  const menuItems = router.getMenuRoutes(userRole) || ([] as SubRoute[]);
  const leafRoutes = router.getMenuLeafRoutes(userRole);

  const navigateSubRoute = (paths: string[], key: "key" | "path" = "key") => {
    const trace = router.search(paths, key);
    setTrace(trace);
    navigate(`/${trace.map((r) => r.path).join("/")}`);
  };

  useEffect(() => {
    setTrace(router.search(pathname.split("/").filter(Boolean), "path"));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname]);

  return {
    menuItems,
    leafRoutes,
    curRouteTrace: trace,
    navigate,
    navigateSubRoute,
  };
}
