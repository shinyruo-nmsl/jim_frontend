import { NonIndexRouteObject } from "react-router-dom";
import { Role } from "./user";

type _SubRoute = {
  label: string;
  key: string;
  show?: boolean;
  icon?: React.ReactNode;
  auths?: Role[];
} & Omit<NonIndexRouteObject, "children">;

export type SubRoute<T extends _SubRoute = _SubRoute> = T & {
  children?: SubRoute[];
};
