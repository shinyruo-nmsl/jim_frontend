import { request } from "@/util/http";
import { User } from "proj-type";

export async function fetchGetUserLoginInfo() {
  return request<User.UserLoginInfo>({
    method: "GET",
    url: "/user/getUserLoginInfo",
  });
}
