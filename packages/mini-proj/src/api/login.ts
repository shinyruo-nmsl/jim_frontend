import { request } from "@/util/http";

export function fetchLogin(code: string) {
  return request<{ token: string }>({
    method: "POST",
    url: "/login/miniLogin",
    data: { code },
  });
}
