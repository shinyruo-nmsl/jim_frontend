import { AuthToken, request } from "@/util/http";

export type LoginParam = {
  account: string;
  password: string;
};

export async function login(params: LoginParam) {
  const { token } = await request<{ token: string }>({
    method: "post",
    url: "/login/login",
    data: { ...params },
  });

  AuthToken.setToken(token);
}

export type RegistParam = {
  account: string;
  password: string;
};

export async function regist(params: RegistParam) {
  await request({
    method: "post",
    url: "/login/regist",
    data: { ...params },
  });
}
