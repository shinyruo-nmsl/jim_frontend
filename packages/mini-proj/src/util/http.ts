import Taro from "@tarojs/taro";
import { Http, Tool } from "proj-util";

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
  V,
  P extends Record<string, string | number> = {},
>(url: string, query: P, headers = {}) {
  const requestTask = Taro.request({
    method: "GET",
    url: `${process.env.TARO_APP_BASE_API}${url}${Http.buildUrlQuery(query)}`,
    header: {
      "Content-Type": "text/event-stream",
      ...Http.appendToken(headers, AuthToken),
    },
    enableChunked: true,
  });

  let p = Tool.createPromiseResolvers<IteratorResult<V>, Event>();

  requestTask.onChunkReceived((res) => {
    console.log(Http.arrayBuffer2String(res.data));
    // p.resolve({
    //   value: JSON.parse(Http.arrayBuffer2String(res.data)),
    //   done: false,
    // });
  });

  requestTask.offChunkReceived((res) => {
    p.resolve({
      value: JSON.parse(Http.arrayBuffer2String(res.data)),
      done: true,
    });
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
