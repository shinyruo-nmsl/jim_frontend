import axios, { AxiosRequestConfig, AxiosResponse } from "axios";
import { HttpMethod, HttpEventType } from "@/global-type/http";
import StorageUtil from "./storage";
import { EventEmitter } from "./event";
import { createPromiseResolvers } from "./tool";

export async function request<T>(
  config: AxiosRequestConfig & { method: HttpMethod }
) {
  const { url, headers = {} } = config;
  const _config = { ...config };

  if (url?.startsWith("/")) {
    _config.url = `${import.meta.env.VITE_APP_BASE_API}${url}`;
  }

  _config.headers = appendToken(headers);

  const res = await axios<any, AxiosResponse<T, any>>({
    ..._config,
    validateStatus() {
      return true;
    },
  });

  return handleResponse(res);
}

export function createEventSourceStream<
  V,
  P extends Record<string, string | number>,
>(url: string, query: P, option: EventSourceInit = { withCredentials: false }) {
  const eventSource = new EventSource(
    `${import.meta.env.VITE_APP_BASE_API}${url}${buildUrlQuery(query)}`,
    option
  );

  let p = createPromiseResolvers<IteratorResult<V>, Event>();

  eventSource.addEventListener("message", (event) => {
    p.resolve(JSON.parse(event.data) as IteratorResult<V>);
  });

  eventSource.addEventListener("error", (error) => {
    p.reject(error);
  });

  const stream = {
    async next() {
      const { value, done } = await p.promise;
      if (!done) {
        p = createPromiseResolvers();
        return { value, done };
      }
      return { value, done };
    },

    [Symbol.asyncIterator]() {
      return this;
    },
  };

  return stream;
}

export async function createFetchStream<
  P extends Record<string, string | number>,
>(url: string, query: P, headers = {}) {
  const response = await fetch(
    `${import.meta.env.VITE_APP_BASE_API}${url}${buildUrlQuery(query)}`,
    {
      method: "get",
      headers: {
        "Content-Type": "text/event-stream",
        ...appendToken(headers),
      },
    }
  );

  if (response.status > 200) {
    handleResponse({
      status: response.status,
      data: await response.json(),
    });
  }

  const reader = response.body!.getReader();

  const stream = {
    async next() {
      const { done, value } = await reader.read();
      const decoder = new TextDecoder();
      const text = decoder.decode(value);
      return { done, value: text };
    },

    [Symbol.asyncIterator]() {
      return this;
    },
  };

  return stream;
}

function buildUrlQuery(query: Record<string, string | number>) {
  const keys = Object.keys(query);

  if (keys.length < 1) return "";
  return "?" + keys.map((k) => `${k}=${query[k]}`).join("&");
}

function appendToken(headers: any) {
  const token = AuthToken.token;

  if (token) {
    return { ...headers, Authorization: token };
  }

  return headers;
}

function handleResponse<T>(res: { status: number; data: T }) {
  const code = res.status;

  if (code === 200) return res.data;

  switch (code) {
    case 400:
      throw new Error((res.data as { msg: string })?.msg || "参数出错~");
    case 401:
      HttpEventEmitter.triggerHandler("code_401");
      throw new Error((res.data as { msg: string })?.msg || "暂未登录~");
    case 403:
      throw new Error((res.data as { msg: string })?.msg || "暂无访问权限~");
    case 408:
      throw new Error((res.data as { msg: string })?.msg || "连接超时~");
    case 500:
      throw new Error((res.data as { msg: string })?.msg || "服务端错误~");
    default:
      throw new Error((res.data as { msg: string })?.msg || "网络开小差啦~");
  }
}

export class AuthToken {
  private static _token: string | null;

  static readonly tokenKey = "__requset_token___";

  static get token() {
    if (!this._token) {
      this._token = StorageUtil.get(this.tokenKey);
    }

    return this._token;
  }

  static setToken(token: string) {
    StorageUtil.set(this.tokenKey, token, 24 * 60 * 60);
  }

  static remove() {
    StorageUtil.remove(this.tokenKey);
    this._token = null;
  }
}

export class HttpEventEmitter {
  private static eventEmitter = new EventEmitter();

  static registHandler(type: HttpEventType, handler: (...args: any[]) => void) {
    this.eventEmitter.on(type, handler);
  }

  static triggerHandler(type: HttpEventType) {
    this.eventEmitter.fire(type);
  }

  static removeHandler(type: HttpEventType, handler: (...args: any[]) => void) {
    this.eventEmitter.remove(type, handler);
  }
}
