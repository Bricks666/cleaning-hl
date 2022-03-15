import { useUserInfo } from "./useUserInfo";

export const useBalance = () => {
	return useUserInfo().balance;
};
