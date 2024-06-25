import { request } from "@/util/http";
import { User } from "proj-service";

export async function fetchGetUserLoginInfo() {
  return request<User.UserLoginInfo>({
    method: "GET",
    url: "/user/getUserLoginInfo",
  });
}
