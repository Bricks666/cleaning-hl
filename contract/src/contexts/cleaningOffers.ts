import { CleaningOffer } from '@/models';
import { fromBuffer, toBuffer } from '@/utils';
import { Context } from 'fabric-contract-api';
import { UserList } from './users';

export class CleaningOfferList {
	readonly ctx: Context;
	readonly KEY: string;

	constructor(ctx: Context) {
		this.ctx = ctx;
		this.KEY = 'offersCleaning';
	}
	async setOffers(offers: CleaningOffer[]): Promise<void> {
		const data = toBuffer(offers);
		await this.ctx.stub.putState(this.KEY, data);
	}
	async addOffer(offer: CleaningOffer): Promise<void> {
		const offers = await this.getOffers();
		offers.push(offer);
		await this.setOffers(offers);
	}
	async getOffers(): Promise<CleaningOffer[]> {
		const data = await this.ctx.stub.getState(this.KEY);
		return fromBuffer(data);
	}
	async getOffer(offerId: number): Promise<CleaningOffer | undefined> {
		const offers = await this.getOffers();
		return offers.find((offer) => offer.id === offerId);
	}
	async getSendedOffers(login: string): Promise<CleaningOffer[]> {
		const offers = await this.getOffers();
		return offers.filter((offer) => offer.loginUser === login);
	}
	async getReceivedOffers(login: string): Promise<CleaningOffer[]> {
		const offers = await this.getOffers();

		return offers.filter((offer) => offer.loginWorker === login);
	}
	async finishOffer(offerId: number): Promise<void> {
		const offers = await this.getOffers();
		const offer = offers.find((offer) => offer.id === offerId);
		if (!offer) {
			throw new Error();
		}
		offer.finished = true;
		await this.setOffers(offers);
	}
}

export class CleaningOffersCTX extends Context {
	readonly userList: UserList;
  readonly cleaningOfferList: CleaningOfferList

	constructor() {
		super();
		this.cleaningOfferList = new CleaningOfferList(this);
		this.userList = new UserList(this);
	}
}
