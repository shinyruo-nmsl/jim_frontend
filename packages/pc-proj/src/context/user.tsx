import {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactElement,
} from "react";
import { User } from "proj-service";
import { UserLoginDispatch, UserLoginDisplayInfo } from "@/global-type/user";
import { fetchGetUserLoginInfo, fetchUpdateUserDisplayInfo } from "@/api/user";
import { exitLogin } from "@/service/login";

export const UserLoginInfoContext = createContext<User.UserLoginInfo>({
  role: "visitor",
  userId: "",
  account: "",
  platform: "pc",
});

export const UserLoginDispatchContext = createContext<UserLoginDispatch | null>(
  null
);

export function UserLoginProvider({ children }: { children: ReactElement }) {
  const [isInitUserLoginInfo, setIsInitUserLoginInfo] = useState(false);
  const [userLoginInfo, setUserLoginInfo] = useState<User.UserLoginInfo>({
    role: "visitor",
    userId: "",
    account: "",
    platform: "pc",
  });

  const refresh = async () => {
    setUserLoginInfo(await fetchGetUserLoginInfo());
  };

  const exit = async () => {
    exitLogin();
    refresh();
  };

  const updateUserDisplayInfo = async (userInfo: UserLoginDisplayInfo) => {
    if (userLoginInfo.role === "visitor") {
      throw new Error("用户尚未登录~");
    }
    await fetchUpdateUserDisplayInfo(userInfo);
    refresh();
  };

  const loginDispatch = async (action: Parameters<UserLoginDispatch>[0]) => {
    switch (action.type) {
      case "exit":
        await exit();
        break;
      case "refresh":
        await refresh();
        break;
      case "update_display_info":
        await updateUserDisplayInfo(action.userInfo);
        break;
    }
  };

  useEffect(() => {
    fetchGetUserLoginInfo().then((info) => {
      setUserLoginInfo(info);
      setIsInitUserLoginInfo(true);
    });
  }, []);

  if (!isInitUserLoginInfo) return <></>;

  return (
    <UserLoginInfoContext.Provider value={userLoginInfo}>
      <UserLoginDispatchContext.Provider value={loginDispatch}>
        {children}
      </UserLoginDispatchContext.Provider>
    </UserLoginInfoContext.Provider>
  );
}

// eslint-disable-next-line react-refresh/only-export-components
export function useUserLoginInfo() {
  const context = useContext(UserLoginInfoContext);
  return context;
}

// eslint-disable-next-line react-refresh/only-export-components
export function useUserLoginDispatch() {
  const dispatch = useContext(UserLoginDispatchContext);
  return dispatch!;
}
