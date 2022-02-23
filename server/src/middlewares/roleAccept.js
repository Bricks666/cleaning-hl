import { ApiError } from "../services";

export const roleAccept = (role) => {
	return (req, res, next) => {
		try {
			const { user } = req.body;
			if (!user.role === role) {
				throw ApiError.NoAccess("Your role invalid");
			}
			next();
		} catch (e) {
			next(e);
		}
	};
};
