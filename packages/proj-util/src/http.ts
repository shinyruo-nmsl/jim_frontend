import { Storage, StorageCore } from "./storage";
import { EventEmitter } from "./event";

export type HttpEventType = "code_401";

export function buildUrlQuery(query: Record<string, string | number>) {
  const keys = Object.keys(query);

  if (keys.length < 1) return "";
  return "?" + keys.map((k) => `${k}=${query[k]}`).join("&");
}

export function appendToken(headers: any, auth: AuthToken<StorageCore>) {
  const token = auth.token;

  if (token) {
    return { ...headers, Authorization: token };
  }

  return headers;
}

export function handleResponse<T>(res: { status: number; data: T }) {
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

export class AuthToken<C extends StorageCore> {
  constructor(private storage: Storage<C>) {}

  private _token: string | null;

  readonly tokenKey = "__requset_token___";

  get token() {
    if (!this._token) {
      this._token = this.storage.get(this.tokenKey);
    }

    return this._token;
  }

  setToken(token: string) {
    this.storage.set(this.tokenKey, token, 24 * 60 * 60);
  }

  remove() {
    this.storage.remove(this.tokenKey);
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
