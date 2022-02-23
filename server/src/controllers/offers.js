import { ApiError, OffersServices } from "../services";

export class OfferControllers {
	static async addOffer(req, res, next) {
		try {
			const { user, worker, money } = req.body;
			if (!worker || !money) {
				throw ApiError.BadRequest("Worker and money");
			}
			const offer = await OffersServices.addOffer(
				user.login,
				user.org,
				worker,
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
