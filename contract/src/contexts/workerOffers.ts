import { WorkerOffer } from '@/models';
import { fromBuffer, toBuffer } from '@/utils';
import { Context } from 'fabric-contract-api';
import { UserList } from './users';

export class WorkerOffersList {
	readonly ctx: Context;
	readonly KEY: string;

	constructor(ctx: Context) {
		this.ctx = ctx;
		this.KEY = 'offersToWorker';
	}
	async setOffers(offers: WorkerOffer[]): Promise<void> {
		const data = toBuffer(offers);
		await this.ctx.stub.putState(this.KEY, data);
	}
	async getOffers(): Promise<WorkerOffer[]> {
		const data = await this.ctx.stub.getState(this.KEY);
		return fromBuffer(data);
	}
	async getOffer(offerId: number): Promise<WorkerOffer | undefined> {
		const offers = await this.getOffers();
		return offers[offerId];
	}
	async addOffer(offer: WorkerOffer): Promise<void> {
		const offers = await this.getOffers();
		offers.push(offer);
		await this.setOffers(offers);
	}

	async finishOffer(offerId: number): Promise<void> {
		const offers = await this.getOffers();

		offers[offerId].finished = true;
		await this.setOffers(offers);
	}
	async voteFor(login: string, offerId: number): Promise<void> {
		const offers = await this.getOffers();

		offers[offerId].voteFor.push(login);
		await this.setOffers(offers);
	}
	async voteAgainst(login: string, offerId: number): Promise<void> {
		const offers = await this.getOffers();

		offers[offerId].voteAgainst.push(login);
		await this.setOffers(offers);
	}
}

export class WorkerOffersCTX extends Context {
	readonly workerOffersList: WorkerOffersList;
	readonly userList: UserList;

	constructor() {
		super();
		this.workerOffersList = new WorkerOffersList(this);
		this.userList = new UserList(this);
	}
}
