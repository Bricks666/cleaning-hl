"use strict";

const {Contract, Context} = require("fabric-contract-api");
const { UserList } = require("./Users");

class OfferCleaningList {
    constructor(ctx) {
        this.ctx = ctx;
        this.KEY = "offersCleaning";
    }
    async createOffers(offers) {
        const DataOffers = Buffer.from(JSON.stringify(offers));
        await this.ctx.stub.putState(this.KEY, DataOffers);
    }
    async addOffer(offer) {
        const OffersList = await this.ctx.stub.getState(this.KEY);
        const offers = JSON.parse(OffersList.toString());
        offers.push(offer);
        const DataOffers = Buffer.from(JSON.stringify(offers));
        await this.ctx.stub.putState(this.KEY, DataOffers);
    }
    async getOffers() {
        const OffersList = await this.ctx.stub.getState(this.KEY);
        const offers = JSON.parse(OffersList.toString());
        return offers;
    }
    async getOffer(offerId) {
        const OffersList = await this.ctx.stub.getState(this.KEY);
        const offers = JSON.parse(OffersList.toString());
        return offers[offerId];
    }
    async finishOffer(offerId) {
        const OffersList = await this.ctx.stub.getState(this.KEY);
        const offers = JSON.parse(OffersList.toString());
        offers[offerId].finished = true;
        const DataOffers = Buffer.from(JSON.stringify(offers));
        await this.ctx.stub.putState(this.KEY, DataOffers);
    }
}

class OfferCleaning {
    constructor(id, loginUser, loginWorker, money) {
        this.id = id;
        this.loginUser = loginUser;
        this.loginWorker = loginWorker;
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
        offers = [];
        await ctx.offerCleaningList.createOffers(offers);
        return offers;
    }
    async addOfferCleaning(ctx, loginUser, loginWorker, money) {
        const users = await ctx.userList.getUsers();
        if (!users[loginUser]) {
            return new Error("You are not registered");
        }
        if (users[loginWorker].role !== "Worker") {
            return new Error("The loginWorker is not login worker");
        }
        const offers = await ctx.offerCleaningList.getOffers();
        const offer = new OfferCleaning(offers.length, loginUser, loginWorker, money);
        await ctx.offerCleaningList.addOffer(offer);
        await ctx.userList.sendMoney(loginUser, money);
        return offer;
    }
    async acceptOfferCleaning(ctx, login, offerId) { //логин - работник, котрый прнимает/отклоняет
        const users = await ctx.userList.getUsers();
        if (users[login].role !== "Worker") {
            return new Error("You are not worker");
        }
        const offers = await ctx.offerCleaningList.getOffers();
        if (offers[offerId].finished === true) {
            return new Error("The offer is finished");
        }
        await ctx.userList.recieveMoney(login, offers[offerId].money);
        await ctx.offerCleaningList.finishOffer(offerId);
    }
    async cancelOfferCleaning(ctx, login, offerId) {//логин - работник, котрый прнимает/отклоняет
        const users = await ctx.userList.getUsers();
        if (users[login].role !== "Worker") {
            return new Error("You are not worker");
        }
        const offers = await ctx.offerCleaningList.getOffers();
        if (offers[offerId].finished === true) {
            return new Error("The offer is finished");
        }
        await ctx.userList.recieveMoney(offers[offerId].loginUser, offers[offerId].money);
        await ctx.offerCleaningList.finishOffer(offerId);
    }
}

module.exports.CleaningContract = CleaningContract;
