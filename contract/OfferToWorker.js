"use strict";

const {Contract, Context} = require("fabric-contract-api");
const { UserList } = require("./Users");

class OfferToWorkerList {
    constructor(ctx) {
        this.ctx = ctx;
        this.KEY = "offersToWorker";
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
    async voteFor(login, offerId) {
        const OffersList = await this.ctx.stub.getState(this.KEY);
        const offers = JSON.parse(OffersList.toString());
        offers[offerId].voteFor.push(login);
        const DataOffers = Buffer.from(JSON.stringify(offers));
        await this.ctx.stub.putState(this.KEY, DataOffers);
    }
}

class OfferToWorker {
    constructor(id, loginToWorker) {
        this.id = id;
        this.loginToWorker = loginToWorker;
        this.voteFor = [];
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
        offers = [];
        await ctx.offerToWorkerList.createOffers(offers);
        return offers;
    }
    async addOfferToWorker(ctx, login) {
        const users = await ctx.userList.getUsers();
        if (users[login].onOffer === true) {
            return new Error("The user is on offer");
        }
        if (users[login].role === "Worker") {
            return new Error("The user is worker");
        }
        const offers = await ctx.offerToWorkerList.getOffers();
        const offer = new OfferToWorker(offers.length, login);
        await ctx.offerToWorkerList.addOffer(offer);
        return offer;
    }
    async voteFor(ctx, login, offerId) {
        const users = await ctx.userList.getUsers();
        if (users[login].role !== "Worker") {
            return new Error("You are not worker");
        }
        const offers = await ctx.offerToWorkerList.getOffers();
        if (offers[offerId].voteFor.indexOf(login) !== -1) {
            return new Error("You are already voted");
        }
        const userArray = Object.values(users);
        const countWorkers = userArray.filter(user => user.role === "Worker").length
        if (countWorkers / (offers[offerId].voteFor.length+1) < 2) {
            await ctx.userList.addWorker(offers[offerId].loginToWorker);
            await ctx.offerToWorkerList.finishOffer(offerId);
        }
        await ctx.offerToWorkerList.voteFor(login, offerId);
    }
}

module.exports.OfferContract = OfferContract;