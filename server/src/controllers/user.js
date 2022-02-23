import { UserServices } from "../services";

export class UserController {
	static async getUser(req, res, next) {
		try {
			const { user } = req.body;
			const userData = await UserServices.getUser(user.login, user.org);
			res.json({ user: userData });
		} catch (e) {
			next(e);
		}
	}

	static async getUsers(req, res, next) {
		try {
			const { user } = req.body;
			const users = await UserServices.getUsers(user.login, user.org);
			res.json({ users });
		} catch (e) {
			next(e);
		}
	}
}
