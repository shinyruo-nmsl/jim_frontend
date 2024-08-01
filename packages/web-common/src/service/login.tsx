import { Navigate } from "react-router-dom";
import { useUserLoginInfo } from "@web/context/user";
import { AuthToken } from "@web/util/http";

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
