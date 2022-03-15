import { Navigate } from "react-router";
import { useIsLogin } from "../../hooks";

export const AuthRoute = ({ children }) => {
  const isLogin = useIsLogin();
  if (!isLogin) {
    return <Navigate to="/login" />;
  }

  return children;
};
