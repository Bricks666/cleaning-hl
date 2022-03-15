"use strict";

const { Contract, Context } = require("fabric-contract-api");
const { UserList } = require("./Users");

class OfferToWorkerList {
	constructor(ctx) {
		this.ctx = ctx;
		this.KEY = "offersToWorker";
	}
	async setOffers(offers) {
		const DataOffers = Buffer.from(JSON.stringify(offers));
		await this.ctx.stub.putState(this.KEY, DataOffers);
	}
	async getOffers() {
		const OffersList = await this.ctx.stub.getState(this.KEY);
		const offers = JSON.parse(OffersList.toString());
		return offers;
	}
	async getOffer(offerId) {
		const offers = await this.getOffers();
		return offers[offerId];
	}
	async addOffer(offer) {
		const offers = await this.getOffers();
		offers.push(offer);
		await this.setOffers(offers);
	}

	async finishOffer(offerId) {
		const offers = await this.getOffers();

		offers[offerId].finished = true;
		await this.setOffers(offers);
	}
	async voteFor(login, offerId) {
		const offers = await this.getOffers();

		offers[offerId].voteFor.push(login);
		await this.setOffers(offers);
	}
	async voteAgainst(login, offerId) {
		const offers = await this.getOffers();

		offers[offerId].voteAgainst.push(login);
		await this.setOffers(offers);
	}
}

class OfferToWorker {
	constructor(id, loginToWorker, offererLogin) {
		this.id = id;
		this.loginToWorker = loginToWorker;
		this.voteFor = [offererLogin];
		this.voteAgainst = [];
		this.finished = false;
	}
}

class OfferToWorkerCTX extends Context {
	constructor() {
		super();
		this.offerToWorkerList = new OfferToWorkerList(this);
		this.userList = new UserList(this);
	}
}

class OfferContract extends Contract {
	createContext() {
		return new OfferToWorkerCTX();
	}
	async initializationContract(ctx) {
		const offers = [];
		await ctx.offerToWorkerList.setOffers(offers);
		return offers;
	}
	async addOfferToWorker(ctx, offererLogin, candidateLogin) {
		const offerer = await ctx.userList.getUser(offererLogin);
		const candidate = await ctx.userList.getUser(candidateLogin);
		if (candidate.onOffer === true) {
			return false;
		}
		if (candidate.role === "Worker") {
			return false;
		}
		if (offerer.role !== "Worker") {
			return false;
		}
		const offers = await ctx.offerToWorkerList.getOffers();
		const offer = new OfferToWorker(
			offers.length,
			candidateLogin,
			offererLogin
		);
		await ctx.offerToWorkerList.addOffer(offer);
		await ctx.userList.addOfferToWorker(candidateLogin);
		return offer;
	}
	async voteFor(ctx, login, offerId) {
		const user = await ctx.userList.getUser(login);
		if (user.role !== "Worker") {
			return false;
		}
		const offer = await ctx.offerToWorkerList.getOffer(offerId);
		if (offer.voteFor.indexOf(login) !== -1) {
			return false;
		}
		if (offer.voteAgainst === login) {
			return false;
		}
		const workersCount = (await ctx.userList.getWorkers()).length;
		if (workersCount / (offer.voteFor.length + 1) < 2) {
			await ctx.userList.addWorker(offer.loginToWorker);
			await ctx.offerToWorkerList.finishOffer(offerId);
			await ctx.offerToWorkerList.removeOfferToWorker(offer.loginToWorker);
			return true;
		}
		await ctx.offerToWorkerList.voteFor(login, offerId);
		return false;
	}
	async voteAgainst(ctx, login, offerId) {
		const user = await ctx.userList.getUser(login);
		if (user.role !== "Worker") {
			return false;
		}
		const offer = await ctx.offerToWorkerList.getOffer(offerId);
		if (offer.voteFor.indexOf(login) !== -1) {
			return false;
		}
		if (offer.voteAgainst == login) {
			return false;
		}

		await ctx.offerToWorkerList.voteAgainst(login, offerId);
		await ctx.offerToWorkerList.finishOffer(offerId);
		await ctx.offerToWorkerList.removeOfferToWorker(offer.loginToWorker);

		return true;
	}
	async getOffers(ctx) {
		return await ctx.offerToWorkerList.getOffers();
	}
}

module.exports.OfferContract = OfferContract;
