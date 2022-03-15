import { useSelector } from "react-redux";

export const useUserLoading = () => {
	return useSelector((state) => state.user.isLoading);
};
