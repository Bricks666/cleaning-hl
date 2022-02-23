import { AuthServices, Tokens } from "../services";

export class AuthController {
	static async login(req, res, next) {
		try {
			const { login } = req.body;
			const user = await AuthServices.login(login);
			const accessToken = Tokens.sign({
				login: user.login,
				role: user.role,
				org: "org1",
			});
			const refreshToken = Tokens.sign({
				login: user.login,
				role: user.role,
				org: "org1",
			});
			res.json({ accessToken, refreshToken, user });
		} catch (e) {
			next(e);
		}
	}
	static async registration(req, res, next) {
		try {
			const { login } = req.body;

			await AuthServices.registration(login, "0000");
			res.json({ resultCode: 0 });
		} catch (e) {
			next(e);
		}
	}
}
