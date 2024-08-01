import { User } from "proj-service";
import { request } from "../util/http";
import { UserLoginDisplayInfo } from "../type/user";

export async function fetchGetUserLoginInfo() {
  return request<User.UserLoginInfo>({
    method: "get",
    url: User.URL.GetUserLoginInfo,
  });
}

export async function fetchUpdateUserDisplayInfo(
  userInfo: UserLoginDisplayInfo
) {
  return request({
    method: "post",
    url: User.URL.UpdateUserDisplayInfo,
    data: { ...userInfo },
  });
}
