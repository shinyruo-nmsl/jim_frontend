import { useState } from "react";
import { Navigate } from "react-router-dom";
import { useUserLoginDispatch, useUserLoginInfo } from "@web/context/user";
import { AuthToken } from "@web/util/http";
import { fetchLogin } from "@web/api/login";

export function exitLogin() {
  AuthToken.remove();
}

export function withLogin(WrappedComponent: React.ComponentType) {
  const ComponentWithLogin = () => {
    const { role } = useUserLoginInfo();

    if (role === "visitor") {
      return <Navigate to="/login" replace={true}></Navigate>;
    }

    return <WrappedComponent />;
  };

  return ComponentWithLogin;
}

export function useLogin() {
  const loginDispatch = useUserLoginDispatch();

  const tabs = ["登录", "注册"];
  const [curTabIndex, setCurTabIndex] = useState(0);

  const [loginName, setLoginName] = useState("");
  const [loginPassword, setLoginPassword] = useState("");

  const [registName, setRegistName] = useState("");
  const [registPassword, setRegistPassword] = useState("");

  const login = async () => {
    if (!loginName) {
      throw new Error("用户名为空~");
    }
    if (!loginPassword) {
      throw new Error("密码为空~");
    }
    try {
      await fetchLogin({ account: loginName, password: loginPassword });
      await loginDispatch({ type: "refresh" });
    } catch (err: any) {
      throw new Error(err.message);
    }
  };

  const regist = async () => {
    if (!registName) {
      throw new Error("用户名为空~");
    }
    if (!registPassword) {
      throw new Error("密码为空~");
    }
    try {
      await fetchLogin({ account: registName, password: registPassword });
      setCurTabIndex(0);
    } catch (err: any) {
      throw new Error(err.message);
    }
  };

  return {
    loginName,
    setLoginName,
    loginPassword,
    setLoginPassword,
    login,

    registName,
    setRegistName,
    registPassword,
    setRegistPassword,
    regist,

    tabs,
    curTabIndex,
    setCurTabIndex,
  };
}
