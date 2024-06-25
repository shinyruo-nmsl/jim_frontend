import { Model } from "proj-type";

export type Role = "admin" | "member" | "ordinary" | "visitor";

export type UserLoginInfo = {
  userId: string;
  account: string;
  role: Role;
  userName?: string;
  avatar?: string;
};

export const UserRoles: Role[] = ["admin", "member", "ordinary"];

export const UserRoleOptions: Model.Opiton<Role>[] = UserRoles.map((role) => ({
  label: formatUserRole(role),
  value: role,
}));

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
