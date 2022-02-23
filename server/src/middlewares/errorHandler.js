import { ApiError } from "../services";
export const errorHandler = (err, _, res, next) => {
	console.log(err);
	if (err instanceof ApiError) {
		return res.status(err.status).json(err);
	}
	return res.status(500).json(err);
};
