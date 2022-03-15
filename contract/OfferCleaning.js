"use strict";

const { Contract, Context } = require("fabric-contract-api");
const { UserList } = require("./Users");

class OfferCleaningList {
	constructor(ctx) {
		this.ctx = ctx;
		this.KEY = "offersCleaning";
	}
	async setOffers(offers) {
		const DataOffers = Buffer.from(JSON.stringify(offers));
		await this.ctx.stub.putState(this.KEY, DataOffers);
	}
	async addOffer(offer) {
		const offers = await this.getOffers();
		offers.push(offer);
		await this.setOffers(offers);
	}
	async getOffers() {
		const OffersList = await this.ctx.stub.getState(this.KEY);
		return JSON.parse(OffersList.toString());
	}
	async getOffer(offerId) {
		const offers = await this.getOffers();
		return offers[offerId];
	}
	async getSendedOffers(login) {
		const offers = await this.getOffers();
		return offers.filter((offer) => offer.loginUser === login);
	}
	async getReceivedOffers(login) {
		const offers = await this.getOffers();

		return offers.filter((offer) => offer.loginWorker === login);
	}
	async finishOffer(offerId) {
		const offers = await this.getOffers();

		offers[offerId].finished = true;
		await this.setOffers(offers);
	}
}

class OfferCleaning {
	constructor(id, loginUser, loginWorker, carId, money) {
		this.id = id;
		this.loginUser = loginUser;
		this.loginWorker = loginWorker;
		this.carId = carId;
		this.money = money;
		this.finished = false;
	}
}

class OfferCleaningCTX extends Context {
	constructor() {
		super();
		this.offerCleaningList = new OfferCleaningList(this);
		this.userList = new UserList(this);
	}
}

class CleaningContract extends Contract {
	createContext() {
		return new OfferCleaningCTX();
	}
	async initializationContract(ctx) {
		const offers = [];
		await ctx.offerCleaningList.setOffers(offers);
		return offers;
	}
	async addOfferCleaning(ctx, loginUser, loginWorker, carId, money) {
		const client = await ctx.userList.getUser(loginUser);
		const worker = await ctx.userList.getUser(loginWorker);
		if (!client || !worker) {
			return new Error("You are not registered");
		}
		if (worker.role !== "Worker") {
			return new Error("The loginWorker is not login worker");
		}
		if (client.cars[carId].onClean !== false) {
			return new Error("The car is on cleaning");
		}
		const offers = await ctx.offerCleaningList.getOffers();
		const offer = new OfferCleaning(
			offers.length,
			loginUser,
			loginWorker,
			carId,
			money
		);
		await ctx.offerCleaningList.addOffer(offer);
		await ctx.userList.sendMoney(loginUser, money);
		await ctx.userList.CarToCleaning(loginUser, carId);
		return offer;
	}
	async acceptOfferCleaning(ctx, login, offerId) {
		//логин - работник, котрый прнимает/отклоняет
		const user = await ctx.userList.getUser(login);
		if (user.role !== "Worker") {
			return new Error("You are not worker");
		}
		const offer = await ctx.offerCleaningList.getOffer(offerId);
		if (offer.finished === true) {
			return new Error("The offer is finished");
		}
		await ctx.userList.recieveMoney(login, offer.money);
		await ctx.offerCleaningList.finishOffer(offerId);
		await ctx.userList.CarNotToCleaning(offer.loginUser, offer.carId);
	}
	async cancelOfferCleaning(ctx, login, offerId) {
		//логин - работник, котрый прнимает/отклоняет
		const user = await ctx.userList.getUser(login);

		if (user.role !== "Worker") {
			return new Error("You are not worker");
		}
		const offer = await ctx.offerCleaningList.getOffer(offerId);
		if (offer.finished === true) {
			return new Error("The offer is finished");
		}
		await ctx.userList.recieveMoney(offer.loginUser, offer.money);
		await ctx.offerCleaningList.finishOffer(offerId);
		await ctx.userList.CarNotToCleaning(offer.loginUser, offer.carId);
	}
	async getSendedOffers(ctx, login) {
		return await ctx.offerCleaningList.getSendedOffers(login);
	}
	async getReceivedOffers(ctx, login) {
		return await ctx.offerCleaningList.getReceivedOffers(login);
	}
}

module.exports.CleaningContract = CleaningContract;
