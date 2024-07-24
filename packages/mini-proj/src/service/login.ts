import Taro from "@tarojs/taro";
import { AuthToken } from "@/util/http";
import { fetchLogin } from "@/api/login";

export function hasLogin() {
  return !!AuthToken.token;
}

export function logout() {
  AuthToken.remove();
}

export async function login() {
  if (hasLogin()) {
    return;
  }

  const { code } = await Taro.login();
  const { token } = await fetchLogin(code);
  AuthToken.setToken(token);
}
