import { User } from "proj-type";
import { createContext, useContext, useState } from "react";
import { getUserLoginInfo } from "@/service/user";
import { useLaunch } from "@tarojs/taro";

const userInitLoginInfo: User.UserLoginInfo = {
  role: "visitor",
  userId: "",
  account: "",
};

export const UserLoginInfoContext =
  createContext<User.UserLoginInfo>(userInitLoginInfo);

export function UserLoginProvider({ children }) {
  const [userLoginInfo, setUserLoginInfo] =
    useState<User.UserLoginInfo>(userInitLoginInfo);

  useLaunch(async () => {
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
