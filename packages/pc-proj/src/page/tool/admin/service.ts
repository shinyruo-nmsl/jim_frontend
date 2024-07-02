import { Model } from "proj-type";
import { User } from "proj-service";
import { request } from "@/util/http";

export interface UsersQuery<T = "userId" | "userName" | "account" | "role">
  extends Model.PaginationQuery {
  type: T;
  value: T extends "role" ? User.Role : string;
}

export function fetchSearchUserLoginInfo(query: UsersQuery) {
  return request<Model.Pagination<User.UserLoginInfo>>({
    method: "get",
    url: "/admin/searchUserLoginInfo",
    params: { ...query },
  });
}

export function fetchUpdateUserRole(userId: string, role: User.Role) {
  return request({
    method: "post",
    url: "/admin/updateUserRole",
    data: { userId, role },
  });
}

export function fetchRemoveUser(userId: string) {
  return request({
    method: "delete",
    url: "/admin/removeUser",
    data: { userId },
  });
}
