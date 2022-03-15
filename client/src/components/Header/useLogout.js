import { useCallback } from "react";
import { useDispatch } from "react-redux";
import { logoutThunk } from "../../models/auth";

export const useLogout = () => {
  const dispatch = useDispatch();

  return useCallback(() => dispatch(logoutThunk()));
};
