import { request } from "../util/http";
import { UserLoginDisplayInfo, UserLoginInfo } from "../global-type/user";

export async function fetchGetUserLoginInfo() {
  return request<UserLoginInfo>({
    method: "get",
    url: "/user/getUserLoginInfo",
  });
}

export async function fetchUpdateUserDisplayInfo(
  userInfo: UserLoginDisplayInfo
) {
  return request({
    method: "post",
    url: "/user/updateUserDisplayInfo",
    data: { ...userInfo },
  });
}
