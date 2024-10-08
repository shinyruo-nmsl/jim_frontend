import axios, { AxiosRequestConfig, AxiosResponse } from "axios";
import * as Http from "@util/http";
import * as Tool from "@util/tool";
import { HttpMethod } from "@web/type/http";
import StorageUtil from "./storage";

export const AuthToken = new Http.AuthToken(StorageUtil);

export async function request<T>(
  config: AxiosRequestConfig & { method: HttpMethod; url: string }
) {
  const { url, headers = {} } = config;
  const _config = { ...config };
  _config.url = getFullUrl(url);
  _config.headers = Http.appendToken(headers, AuthToken);

  const res = await axios<any, AxiosResponse<T, any>>({
    ..._config,
    validateStatus() {
      return true;
    },
  });
  return Http.handleResponse(res);
}

export function createEventSourceStream<
  P extends Record<string, string | number>,
  V = string,
>(url: string, query: P, option: EventSourceInit = { withCredentials: false }) {
  const eventSource = new EventSource(
    `${getFullUrl(url)}${Http.buildUrlQuery(query)}`,
    option
  );

  let p = Tool.createPromiseResolvers<IteratorResult<V>, Event>();
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
        p = Tool.createPromiseResolvers();
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

export async function createFetchStream<D extends Record<string, any>>(
  url: string,
  data: D,
  headers = {}
) {
  const response = await fetch(`${getFullUrl(url)}`, {
    method: "post",
    body: JSON.stringify(data),
    headers: {
      "Content-Type": "application/json",
      ...Http.appendToken(headers, AuthToken),
    },
  });

  if (response.status > 200) {
    Http.handleResponse({
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

function getFullUrl(url: string) {
  if (url.startsWith("http")) {
    return url;
  }
  return `${import.meta.env.VITE_APP_BASE_API}${url}`;
}
