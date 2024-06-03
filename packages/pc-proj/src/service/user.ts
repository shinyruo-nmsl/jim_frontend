import { Opiton } from "../global-type/model";
import { Role } from "../global-type/user";
import { AuthToken } from "../util/http";

export const UserRoles: Role[] = ["admin", "member", "ordinary"];

export const UserRoleOptions: Opiton<Role>[] = UserRoles.map((role) => ({
  label: formatUserRole(role),
  value: role,
}));

export function exitLogin() {
  AuthToken.remove();
}

export function formatUserRole(role: Role) {
  switch (role) {
    case "admin":
      return "管理员";
    case "member":
      return "会员";
    case "ordinary":
      return "普通用户";
    default:
      return "游客";
  }
}
