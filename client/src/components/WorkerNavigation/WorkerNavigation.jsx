import { useUserInfo } from "../../hooks";

export const WorkerNavigation = ({ children }) => {
	const { role } = useUserInfo();

	if (role !== "Worker") {
		return null;
	}

	return children;
};
