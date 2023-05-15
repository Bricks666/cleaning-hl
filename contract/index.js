'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var fabricContractApi = require('fabric-contract-api');

const fromBuffer = (data) => {
    return JSON.parse(data.toString());
};

const toBuffer = (data) => {
    return Buffer.from(JSON.stringify(data));
};

class UserList {
    KEY;
    ctx;
    constructor(ctx) {
        this.ctx = ctx;
        this.KEY = 'users';
    }
    async setUsers(users) {
        const DataUsers = toBuffer(users);
        await this.ctx.stub.putState(this.KEY, DataUsers);
    }
    async addUser(login, user) {
        const users = await this.getUsers();
        users[login] = user;
        await this.setUsers(users);
    }
    async getUsers() {
        const data = await this.ctx.stub.getState(this.KEY);
        return fromBuffer(data);
    }
    async getUser(login) {
        const users = await this.getUsers();
        return users[login];
    }
    async sendMoney(login, money) {
        const users = await this.getUsers();
        users[login].balance = users[login].balance - money;
        await this.setUsers(users);
    }
    async recieveMoney(login, money) {
        const users = await this.getUsers();
        users[login].balance = users[login].balance + +money;
        await this.setUsers(users);
    }
    async addOfferToWorker(login) {
        const users = await this.getUsers();
        users[login].onOffer = true;
        await this.setUsers(users);
    }
    async removeOfferToWorker(login) {
        const users = await this.getUsers();
        users[login].onOffer = false;
        await this.setUsers(users);
    }
    async addWorker(login) {
        const users = await this.getUsers();
        users[login].role = 'Worker';
        await this.setUsers(users);
    }
    async addCars(login, car) {
        const users = await this.getUsers();
        users[login].cars.push(car);
        await this.setUsers(users);
    }
    async CarToCleaning(login, carId) {
        const users = await this.getUsers();
        users[login].cars[carId].onClean = true;
        await this.setUsers(users);
    }
    async CarNotToCleaning(login, carId) {
        const users = await this.getUsers();
        users[login].cars[carId].onClean = false;
        await this.setUsers(users);
    }
    async getWorkers() {
        const users = await this.getUsers();
        return Object.values(users).filter((user) => user.role === 'Worker');
    }
}
class UserCTX extends fabricContractApi.Context {
    userList;
    constructor() {
        super();
        this.userList = new UserList(this);
    }
}

class CarsCTX extends fabricContractApi.Context {
    userList;
    constructor() {
        super();
        this.userList = new UserList(this);
    }
}

class CleaningOfferList {
    ctx;
    KEY;
    constructor(ctx) {
        this.ctx = ctx;
        this.KEY = 'offersCleaning';
    }
    async setOffers(offers) {
        const data = toBuffer(offers);
        await this.ctx.stub.putState(this.KEY, data);
    }
    async addOffer(offer) {
        const offers = await this.getOffers();
        offers.push(offer);
        await this.setOffers(offers);
    }
    async getOffers() {
        const data = await this.ctx.stub.getState(this.KEY);
        return fromBuffer(data);
    }
    async getOffer(offerId) {
        const offers = await this.getOffers();
        return offers.find((offer) => offer.id === offerId);
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
        const offer = offers.find((offer) => offer.id === offerId);
        if (!offer) {
            throw new Error();
        }
        offer.finished = true;
        await this.setOffers(offers);
    }
}
class CleaningOffersCTX extends fabricContractApi.Context {
    userList;
    cleaningOfferList;
    constructor() {
        super();
        this.cleaningOfferList = new CleaningOfferList(this);
        this.userList = new UserList(this);
    }
}

class WorkerOffersList {
    ctx;
    KEY;
    constructor(ctx) {
        this.ctx = ctx;
        this.KEY = 'offersToWorker';
    }
    async setOffers(offers) {
        const data = toBuffer(offers);
        await this.ctx.stub.putState(this.KEY, data);
    }
    async getOffers() {
        const data = await this.ctx.stub.getState(this.KEY);
        return fromBuffer(data);
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
class WorkerOffersCTX extends fabricContractApi.Context {
    workerOffersList;
    userList;
    constructor() {
        super();
        this.workerOffersList = new WorkerOffersList(this);
        this.userList = new UserList(this);
    }
}

class Car {
    id;
    login;
    number;
    brand;
    onClean;
    constructor(id, login, number, brand) {
        this.id = id;
        this.login = login;
        this.onClean = false;
        this.number = number;
        this.brand = brand;
    }
}

class User {
    id;
    login;
    role;
    balance;
    onOffer;
    cars;
    constructor(id, login, role) {
        this.id = id;
        this.login = login;
        this.role = role;
        this.balance = 1000;
        this.onOffer = false;
        this.cars = [];
    }
}

class CleaningOffer {
    id;
    loginUser;
    loginWorker;
    carId;
    money;
    finished;
    constructor(id, loginUser, loginWorker, carId, money) {
        this.id = id;
        this.loginUser = loginUser;
        this.loginWorker = loginWorker;
        this.carId = carId;
        this.money = money;
        this.finished = false;
    }
}

class WorkerOffer {
    id;
    loginToWorker;
    voteFor;
    voteAgainst;
    finished;
    constructor(id, loginToWorker, offererLogin) {
        this.id = id;
        this.loginToWorker = loginToWorker;
        this.voteFor = [offererLogin];
        this.voteAgainst = [];
        this.finished = false;
    }
}

class CarsContract extends fabricContractApi.Contract {
    createContext() {
        return new CarsCTX();
    }
    async initializationContract() { }
    async addCars(ctx, login, number, brand) {
        const users = await ctx.userList.getUsers();
        const car = new Car(users[login].cars.length, login, number, brand);
        await ctx.userList.addCars(login, car);
        return car;
    }
    async getCarsUser(ctx, login) {
        const users = await ctx.userList.getUsers();
        return users[login].cars;
    }
}

class UsersContract extends fabricContractApi.Contract {
    createContext() {
        return new UserCTX();
    }
    async initializationContract(ctx) {
        const users = {
            worker: new User(0, 'worker', 'Worker'),
            user: new User(1, 'user', 'User'),
        };
        await ctx.userList.setUsers(users);
        return users;
    }
    async registration(ctx, login) {
        const users = await ctx.userList.getUsers();
        if (users[login]) {
            throw new Error('You are already registered');
        }
        const user = new User(Object.keys(users).length, login, 'User');
        await ctx.userList.addUser(login, user);
        return user;
    }
    async getUser(ctx, login) {
        return await ctx.userList.getUser(login);
    }
    async getUsers(ctx) {
        return await ctx.userList.getUsers();
    }
}

class CleaningOfferContract extends fabricContractApi.Contract {
    createContext() {
        return new CleaningOffersCTX();
    }
    async initializationContract(ctx) {
        const offers = [];
        await ctx.cleaningOfferList.setOffers(offers);
        return offers;
    }
    async addOfferCleaning(ctx, loginUser, loginWorker, carId, money) {
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
        const offer = new CleaningOffer(offers.length, loginUser, loginWorker, carId, money);
        await ctx.cleaningOfferList.addOffer(offer);
        await ctx.userList.sendMoney(loginUser, money);
        await ctx.userList.CarToCleaning(loginUser, carId);
        return offer;
    }
    async acceptOfferCleaning(ctx, login, offerId) {
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
    async cancelOfferCleaning(ctx, login, offerId) {
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
    async getSendedOffers(ctx, login) {
        return await ctx.cleaningOfferList.getSendedOffers(login);
    }
    async getReceivedOffers(ctx, login) {
        return await ctx.cleaningOfferList.getReceivedOffers(login);
    }
}

class WorkerOffersContract extends fabricContractApi.Contract {
    createContext() {
        return new WorkerOffersCTX();
    }
    async initializationContract(ctx) {
        const offers = [];
        await ctx.workerOffersList.setOffers(offers);
        return offers;
    }
    async addOfferToWorker(ctx, offererLogin, candidateLogin) {
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
    async voteFor(ctx, login, offerId) {
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
    async voteAgainst(ctx, login, offerId) {
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
    async getOffers(ctx) {
        return await ctx.workerOffersList.getOffers();
    }
}

const _CarsContract = CarsContract;
const _OfferContract = WorkerOffersContract;
const _CleaningContract = CleaningOfferContract;
const _UsersContract = UsersContract;
const contracts = [
    UsersContract,
    CleaningOfferContract,
    WorkerOffersContract,
    CarsContract,
];

exports.CarsContract = _CarsContract;
exports.CleaningContract = _CleaningContract;
exports.OfferContract = _OfferContract;
exports.UsersContract = _UsersContract;
exports.contracts = contracts;
