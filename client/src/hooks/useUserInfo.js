import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loadUserInfoThunk } from "../models/user";

export const useUserInfo = () => {
	const info = useSelector((state) => state.user.info);
	const isLoading = useSelector((state) => state.user.isLoading);
	const login = useSelector((state) => state.auth.login);
	const dispatch = useDispatch();
	useEffect(() => {
		if (!isLoading && login && info.login !== login) {
			dispatch(loadUserInfoThunk());
		}
	}, [dispatch, isLoading, info.login, login]);

	return info;
};
