import { ApiError, OffersServices } from "../services";

export class OfferControllers {
	static async getSendedOffers(req, res, next) {
		try {
			const { user } = req.body;
			const offers = await OffersServices.getSendedOffers(user.login, user.org);
			console.log(offers);
			return res.json({ offers });
		} catch (e) {
			next(e);
		}
	}
	static async getReceivedOffers(req, res, next) {
		try {
			const { user } = req.body;
			const offers = await OffersServices.getReceivedOffers(
				user.login,
				user.org
			);
			console.log(offers);

			return res.json({ offers });
		} catch (e) {
			next(e);
		}
	}
	static async addOffer(req, res, next) {
		try {
			const { user, worker, money, carId } = req.body;
			if (!worker || !money) {
				throw ApiError.BadRequest("Worker and money");
			}
			const offer = await OffersServices.addOffer(
				user.login,
				user.org,
        worker,
				carId,
				money
			);
			res.json({ offer });
		} catch (e) {
			next(e);
		}
	}
	static async acceptOffer(req, res, next) {
		try {
			const { user } = req.body;
			const { offerId } = req.params;
			if (!offerId) {
				throw ApiError.BadRequest("OfferId");
			}
			const offer = await OffersServices.acceptOffer(
				user.login,
				user.org,
				offerId
			);
			res.json({ offer });
		} catch (e) {
			next(e);
		}
	}
	static async cancelOffer(req, res, next) {
		try {
			const { user } = req.body;
			const { offerId } = req.params;
			if (!offerId) {
				throw ApiError.BadRequest("OfferId");
			}
			const offer = await OffersServices.cancelOffer(
				user.login,
				user.org,
				offerId
			);
			res.json({ offer });
		} catch (e) {
			next(e);
		}
	}
}
