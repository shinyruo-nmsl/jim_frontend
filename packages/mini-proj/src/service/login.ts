import Taro from "@tarojs/taro";
import { AuthToken } from "@/util/http";

export function hasLogin() {
  return AuthToken.token;
}

export async function login() {
  const { code } = await Taro.login();
}
