import { useSelector } from "react-redux";

export const useIsLogin = () => {
  return useSelector((state) => state.auth.isLogin);
};
