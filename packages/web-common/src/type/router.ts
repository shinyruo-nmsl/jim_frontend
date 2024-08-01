import { NonIndexRouteObject } from "react-router-dom";
import { User } from "proj-service";

type _SubRoute = {
  label: string;
  key: string;
  show?: boolean;
  icon?: React.ReactNode;
  auths?: User.Role[];
} & Omit<NonIndexRouteObject, "children">;

export type SubRoute<T extends _SubRoute = _SubRoute> = T & {
  children?: SubRoute[];
};
