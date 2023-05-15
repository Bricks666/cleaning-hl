import { WorkerOffersCTX } from '@/contexts';
import { WorkerOffer } from '@/models';
import { Contract } from 'fabric-contract-api';

export class WorkerOffersContract extends Contract {
	createContext() {
		return new WorkerOffersCTX();
	}
	async initializationContract(ctx: WorkerOffersCTX) {
		const offers: WorkerOffer[] = [];
		await ctx.workerOffersList.setOffers(offers);
		return offers;
	}
	async addOfferToWorker(
		ctx: WorkerOffersCTX,
		offererLogin: string,
		candidateLogin: string
	): Promise<WorkerOffer> {
		const offerer = await ctx.userList.getUser(offererLogin);
		const candidate = await ctx.userList.getUser(candidateLogin);
		if (!candidate || !offerer) {
			throw new Error();
		}
		if (candidate.onOffer === true) {
			throw new Error();
		}
		if (candidate.role === 'Worker') {
			throw new Error();
		}
		if (offerer.role !== 'Worker') {
			throw new Error();
		}
		const offers = await ctx.workerOffersList.getOffers();
		const offer = new WorkerOffer(offers.length, candidateLogin, offererLogin);
		await ctx.workerOffersList.addOffer(offer);
		await ctx.userList.addOfferToWorker(candidateLogin);
		return offer;
	}
	async voteFor(
		ctx: WorkerOffersCTX,
		login: string,
		offerId: number
	): Promise<boolean> {
		const user = await ctx.userList.getUser(login);
		const offer = await ctx.workerOffersList.getOffer(offerId);
		if (!user || !offer) {
			throw new Error();
		}
		if (user.role !== 'Worker') {
			throw new Error();
		}
		if (offer.voteFor.indexOf(login) !== -1) {
			return false;
		}
		if (offer.voteAgainst.includes(login)) {
			return false;
		}
		const workersCount = (await ctx.userList.getWorkers()).length;
		if (workersCount / (offer.voteFor.length + 1) < 2) {
			await ctx.userList.addWorker(offer.loginToWorker);
			await ctx.workerOffersList.finishOffer(offerId);
			return true;
		}
		await ctx.workerOffersList.voteFor(login, offerId);
		return false;
	}
	async voteAgainst(
		ctx: WorkerOffersCTX,
		login: string,
		offerId: number
	): Promise<boolean> {
		const user = await ctx.userList.getUser(login);
		const offer = await ctx.workerOffersList.getOffer(offerId);

		if (!user || !offer) {
			throw new Error();
		}
		if (user.role !== 'Worker') {
			throw new Error();
		}
		if (offer.voteFor.indexOf(login) !== -1) {
			return false;
		}
		if (offer.voteAgainst.includes(login)) {
			return false;
		}

		await ctx.workerOffersList.voteAgainst(login, offerId);
		await ctx.workerOffersList.finishOffer(offerId);

		return true;
	}
	async getOffers(ctx: WorkerOffersCTX): Promise<WorkerOffer[]> {
		return await ctx.workerOffersList.getOffers();
	}
}
