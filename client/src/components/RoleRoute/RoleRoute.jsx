import { Navigate } from "react-router";
import { useUserInfo } from "../../hooks";

export const RoleRoute = ({ children, acceptedRole }) => {
	const { role } = useUserInfo();

	if (role !== acceptedRole) {
		return <Navigate to="/" />;
	}

	return children;
};
