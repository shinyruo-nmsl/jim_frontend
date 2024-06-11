import { Model, User } from "proj-type";

export const UserRoles: User.Role[] = ["admin", "member", "ordinary"];

export const UserRoleOptions: Model.Opiton<User.Role>[] = UserRoles.map(
  (role) => ({
    label: formatUserRole(role),
    value: role,
  })
);

export function formatUserRole(role: User.Role) {
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