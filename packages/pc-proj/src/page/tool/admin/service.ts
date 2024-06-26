import { Model } from "proj-type";
import { User } from "proj-service";
import { request } from "@/util/http";

export interface UsersQuery extends Model.PaginationQuery {
  type: "userId" | "userName" | "account";
  value: string;
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
