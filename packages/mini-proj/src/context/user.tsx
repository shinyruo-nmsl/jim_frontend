import { useLaunch } from "@tarojs/taro";
import { createContext, useContext, useState } from "react";
import { User } from "proj-service";
import { getUserLoginInfo } from "@/service/user";

import { login } from "@/service/login";

const userInitLoginInfo: User.UserLoginInfo = {
  role: "visitor",
  userId: "",
  account: "",
  platform: "mini",
};

export const UserLoginInfoContext =
  createContext<User.UserLoginInfo>(userInitLoginInfo);

export function UserLoginProvider({ children }) {
  const [userLoginInfo, setUserLoginInfo] =
    useState<User.UserLoginInfo>(userInitLoginInfo);

  useLaunch(async () => {
    await login();
    const user = await getUserLoginInfo();
    setUserLoginInfo(user);
  });

  return (
    <UserLoginInfoContext.Provider value={userLoginInfo}>
      {children}
    </UserLoginInfoContext.Provider>
  );
}

export function useUserLoginInfo() {
  const context = useContext(UserLoginInfoContext);
  return context!;
}
