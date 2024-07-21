import { Model } from "proj-type";

export enum URL {
  GetUserLoginInfo = "/user/getUserLoginInfo",
  UpdateUserDisplayInfo = "/user/updateUserDisplayInfo",
}

export type Role = "admin" | "superMember" | "member" | "ordinary" | "visitor";

export type Platform = "pc" | "mini";

export type UserLoginInfo = {
  userId: string;
  account: string;
  role: Role;
  userName?: string;
  avatar?: string;
  platform: Platform;
};

export const UserRoles: Role[] = ["admin", "superMember", "member", "ordinary"];

export const UserRoleOptions: Model.Opiton<Role>[] = UserRoles.map((role) => ({
  label: formatUserRole(role),
  value: role,
}));

export const UserPlatforms: Platform[] = ["pc", "mini"];

export const PlatformOptions: Model.Opiton<Platform>[] = UserPlatforms.map(
  (platform) => ({
    label: formatPlatform(platform),
    value: platform,
  })
);

export function formatUserRole(role: Role) {
  switch (role) {
    case "admin":
      return "管理员";
    case "member":
      return "会员";
    case "superMember":
      return "超级会员";
    case "ordinary":
      return "普通用户";
    default:
      return "游客";
  }
}

export function formatPlatform(platform: Platform) {
  switch (platform) {
    case "pc":
      return "PC";
    case "mini":
      return "小程序";
  }
}
