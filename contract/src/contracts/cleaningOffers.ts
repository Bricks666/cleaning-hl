import { CleaningOffersCTX } from '@/contexts';
import { CleaningOffer } from '@/models';
import { Contract } from 'fabric-contract-api';

export class CleaningOfferContract extends Contract {
	createContext() {
		return new CleaningOffersCTX();
	}
	async initializationContract(
		ctx: CleaningOffersCTX
	): Promise<CleaningOffer[]> {
		const offers: CleaningOffer[] = [];
		await ctx.cleaningOfferList.setOffers(offers);
		return offers;
	}
	async addOfferCleaning(
		ctx: CleaningOffersCTX,
		loginUser: string,
		loginWorker: string,
		carId: number,
		money: number
	): Promise<CleaningOffer> {
		const client = await ctx.userList.getUser(loginUser);
		const worker = await ctx.userList.getUser(loginWorker);
		if (!client || !worker) {
			throw new Error('You are not registered');
		}
		if (worker.role !== 'Worker') {
			throw new Error('The loginWorker is not login worker');
		}
		if (client.cars[carId].onClean !== false) {
			throw new Error('The car is on cleaning');
		}
		const offers = await ctx.cleaningOfferList.getOffers();
		const offer = new CleaningOffer(
			offers.length,
			loginUser,
			loginWorker,
			carId,
			money
		);
		await ctx.cleaningOfferList.addOffer(offer);
		await ctx.userList.sendMoney(loginUser, money);
		await ctx.userList.CarToCleaning(loginUser, carId);
		return offer;
	}
	async acceptOfferCleaning(
		ctx: CleaningOffersCTX,
		login: string,
		offerId: number
	): Promise<void> {
		//логин - работник, котрый прнимает/отклоняет
		const user = await ctx.userList.getUser(login);
		const offer = await ctx.cleaningOfferList.getOffer(offerId);
		if (!user || !offer) {
			throw new Error('You are not worker');
		}
		if (user.role !== 'Worker') {
			throw new Error('You are not worker');
		}
		if (offer.finished === true) {
			throw new Error('The offer is finished');
		}
		await ctx.userList.recieveMoney(login, offer.money);
		await ctx.cleaningOfferList.finishOffer(offerId);
		await ctx.userList.CarNotToCleaning(offer.loginUser, offer.carId);
	}
	async cancelOfferCleaning(
		ctx: CleaningOffersCTX,
		login: string,
		offerId: number
	): Promise<void> {
		//логин - работник, котрый прнимает/отклоняет
		const user = await ctx.userList.getUser(login);
		const offer = await ctx.cleaningOfferList.getOffer(offerId);
		if (!user || !offer) {
			throw new Error('You are not worker');
		}
		if (user.role !== 'Worker') {
			throw new Error('You are not worker');
		}
		if (offer.finished === true) {
			throw new Error('The offer is finished');
		}
		await ctx.userList.recieveMoney(offer.loginUser, offer.money);
		await ctx.cleaningOfferList.finishOffer(offerId);
		await ctx.userList.CarNotToCleaning(offer.loginUser, offer.carId);
	}
	async getSendedOffers(
		ctx: CleaningOffersCTX,
		login: string
	): Promise<CleaningOffer[]> {
		return await ctx.cleaningOfferList.getSendedOffers(login);
	}
	async getReceivedOffers(
		ctx: CleaningOffersCTX,
		login: string
	): Promise<CleaningOffer[]> {
		return await ctx.cleaningOfferList.getReceivedOffers(login);
	}
}
