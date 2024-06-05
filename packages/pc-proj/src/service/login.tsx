import { useUserLoginInfo } from "@/context/user";
import { Navigate } from "react-router-dom";

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
