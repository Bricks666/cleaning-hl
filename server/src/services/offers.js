import { Fabric } from ".";
import { CONTRACTS, TRANSACTIONS } from "../configs";

export class OffersServices {
	static async addOffer(login, org, worker, money) {
		return await Fabric.transaction(
			org,
			login,
			CONTRACTS.OFFERS,
			TRANSACTIONS.OFFERS.ADD,
			login,
			worker,
			money
		);
	}
	static async acceptOffer(login, org, offerId) {
		return await Fabric.transaction(
			login,
			org,
			CONTRACTS.OFFERS,
			TRANSACTIONS.OFFERS.ACCEPT,
			login,
			offerId
		);
	}
	static async cancelOffer(login, org, offerId) {
		return await Fabric.transaction(
			login,
			org,
			CONTRACTS.OFFERS,
			TRANSACTIONS.OFFERS.CANCEL,
			login,
			offerId
		);
	}
}
