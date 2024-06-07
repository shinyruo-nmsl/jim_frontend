import Taro from "@tarojs/taro";
import { AuthToken, request } from "@/util/http";

export function hasLogin() {
  return !!AuthToken.token;
}

export async function login() {
  if (hasLogin()) {
    return;
  }

  const { code } = await Taro.login();

  const { token } = await request<{ token: string }>({
    method: "POST",
    url: "/login/miniLogin",
    data: { code },
  });

  AuthToken.setToken(token);
}
