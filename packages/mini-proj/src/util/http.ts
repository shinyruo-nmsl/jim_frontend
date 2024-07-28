import Taro from "@tarojs/taro";
import { Http, Tool, File } from "proj-util";

import StorageUtil from "./storage";

type RequestConfig = Parameters<typeof Taro.request>[0];

export const AuthToken = new Http.AuthToken(StorageUtil);

export async function request<T>(config: RequestConfig) {
  const { url, header = {} } = config;
  const _config = { ...config };

  if (url?.startsWith("/")) {
    _config.url = `${process.env.TARO_APP_BASE_API}${url}`;
  }

  _config.header = Http.appendToken(header, AuthToken);

  const res = await Taro.request<T>({
    ..._config,
  });

  return Http.handleResponse({ status: res.statusCode, data: res.data });
}

export async function createMiniStreamm<
  V = string,
  D extends Record<string, any> = {},
>(url: string, data: D, headers = {}) {
  const requestTask = Taro.request({
    method: "POST",
    url: `${process.env.TARO_APP_BASE_API}${url}`,
    data,
    header: {
      ...Http.appendToken(headers, AuthToken),
    },
    enableChunked: true,
  });

  let p = Tool.createPromiseResolvers<IteratorResult<V>, Event>();

  requestTask.onChunkReceived((res) => {
    p.resolve({
      value: File.arrayBuffer2String(res.data) as V,
      done: false,
    });
  });

  requestTask
    .then(() => {
      p.resolve({
        value: "",
        done: true,
      });
    })
    .catch((err) => {
      p.reject(err);
    });

  const stream = {
    async next() {
      const { value, done } = await p.promise;
      if (!done) {
        p = Tool.createPromiseResolvers<IteratorResult<V>, Event>();
        return { value, done };
      }
      return { value, done } as IteratorReturnResult<V>;
    },

    [Symbol.asyncIterator]() {
      return this;
    },
  };

  return stream;
}
