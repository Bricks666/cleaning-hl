import { Fabric } from ".";
import { CONTRACTS, TRANSACTIONS } from "../configs";

export class OffersServices {
	static async getSendedOffers(login, org) {
		return await Fabric.transaction(
			org,
			login,
			CONTRACTS.OFFERS,
			TRANSACTIONS.OFFERS.GET_SENDED,
			login
		);
	}
	static async getReceivedOffers(login, org) {
		return await Fabric.transaction(
			org,
			login,
			CONTRACTS.OFFERS,
			TRANSACTIONS.OFFERS.GET_RECEIVED,
			login
		);
	}
	static async addOffer(login, org, worker, carId, money) {
		return await Fabric.transaction(
			org,
			login,
			CONTRACTS.OFFERS,
			TRANSACTIONS.OFFERS.ADD,
			login,
			worker,
			carId,
			money
		);
	}
	static async acceptOffer(login, org, offerId) {
		return await Fabric.transaction(
			org,
			login,
			CONTRACTS.OFFERS,
			TRANSACTIONS.OFFERS.ACCEPT,
			login,
			offerId
		);
	}
	static async cancelOffer(login, org, offerId) {
		return await Fabric.transaction(
			org,
			login,
			CONTRACTS.OFFERS,
			TRANSACTIONS.OFFERS.CANCEL,
			login,
			offerId
		);
	}
}
