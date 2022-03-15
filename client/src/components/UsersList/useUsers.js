import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { loadUsersThunk } from "../../models/users";

export const useUsers = () => {
	const { isLoading, list: users } = useSelector((state) => state.users);
	const dispatch = useDispatch();

	useEffect(() => {
		if (!users.length) {
			dispatch(loadUsersThunk());
		}
	}, [users.length, dispatch]);

	return { isLoading, users };
};
