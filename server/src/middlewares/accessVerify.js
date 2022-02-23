import { ApiError, Tokens } from "../services";

export const accessVerify = (req, _, next) => {
	try {
		const accessToken = req.headers.authorization?.split(" ")[1];
		if (!accessToken) {
			throw ApiError.NoAccess();
		}

		const user = Tokens.verify(accessToken);
		if (!user) {
			throw ApiError.NoAccess();
		}
		req.body.user = user;
		next();
	} catch (e) {
		next(e);
	}
};
