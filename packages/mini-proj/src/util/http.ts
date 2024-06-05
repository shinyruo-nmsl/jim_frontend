import Taro from "@tarojs/taro";
import { Http } from "proj-util";

import StorageUtil from "./storage";

type RequestConfig = Parameters<typeof Taro.request>[0];

export const AuthToken = new Http.AuthToken(StorageUtil);

export async function request<T>(config: RequestConfig) {
  const { url, header = {} } = config;
  const _config = { ...config };

  if (url?.startsWith("/")) {
    _config.url = `${import.meta.env.VITE_APP_BASE_API}${url}`;
  }

  _config.header = Http.appendToken(header, AuthToken);

  const res = await Taro.request<T>({
    ..._config,
  });

  return Http.handleResponse({ status: res.statusCode, data: res.data });
}
