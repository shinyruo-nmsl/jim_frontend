import { request } from "@/util/http";
import { User } from "proj-service";
import { UserLoginDisplayInfo } from "@/global-type/user";

export async function fetchGetUserLoginInfo() {
  return request<User.UserLoginInfo>({
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
