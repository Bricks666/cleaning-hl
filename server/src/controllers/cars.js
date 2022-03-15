import { CarsServices } from "../services";

export class CarsControllers {
	static async getCars(req, res, next) {
		try {
			const { user } = req.body;
			const cars = await CarsServices.getCars(user.login, user.org);

			return res.json({ cars });
		} catch (e) {
			next(e);
		}
	}
	static async addCar(req, res, next) {
		try {
			const { user, brand, number } = req.body;
			const car = await CarsServices.addCar(
				user.login,
				user.org,
				number,
				brand
			);

			return res.json({ car });
		} catch (e) {
			next(e);
		}
	}
}
