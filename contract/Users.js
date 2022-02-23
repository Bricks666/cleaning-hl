"use strict";

const {Contract, Context} = require("fabric-contract-api");

class UserList {
    constructor(ctx) {
        this.ctx = ctx;
        this.KEY = "users";
    }
    async createUsers(users) {
        const DataUsers = Buffer.from(JSON.stringify(users));
        await this.ctx.stub.putState(this.KEY, DataUsers);
    }
    async addUser(login, user) {
        const ListUsers = await this.ctx.stub.getState(this.KEY);
        const users = JSON.parse(ListUsers.toString());
        users[login] = user;
        const DataUsers = Buffer.from(JSON.stringify(users));
        await this.ctx.stub.putState(this.KEY, DataUsers);    
    }
    async getUsers() {
        const ListUsers = await this.ctx.stub.getState(this.KEY);
        const users = JSON.parse(ListUsers.toString());
        return users;
    }
    async getUser(login) {
        const ListUsers = await this.ctx.stub.getState(this.KEY);
        const users = JSON.parse(ListUsers.toString());
        return users[login];
    }
    async sendMoney(login, money) {
        const ListUsers = await this.ctx.stub.getState(this.KEY);
        const users = JSON.parse(ListUsers.toString());
        users[login].balance -= money;
        const DataUsers = Buffer.from(JSON.stringify(users));
        await this.ctx.stub.putState(this.KEY, DataUsers);
    }
    async recieveMoney(loginRecipient, money) {
        const ListUsers = await this.ctx.stub.getState(this.KEY);
        const users = JSON.parse(ListUsers.toString());
        users[loginRecipient].balance += +money;
        const DataUsers = Buffer.from(JSON.stringify(users));
        await this.ctx.stub.putState(this.KEY, DataUsers);
    }
    async addOfferToWorker(login) {
        const ListUsers = await this.ctx.stub.getState(this.KEY);
        const users = JSON.parse(ListUsers.toString());
        users[login].onOffer = true;
        const DataUsers = Buffer.from(JSON.stringify(users));
        await this.ctx.stub.putState(this.KEY, DataUsers);
    }
    async removeOfferToWorker(login) {
        const ListUsers = await this.ctx.stub.getState(this.KEY);
        const users = JSON.parse(ListUsers.toString());
        users[login].onOffer = false;
        const DataUsers = Buffer.from(JSON.stringify(users));
        await this.ctx.stub.putState(this.KEY, DataUsers);
    }
    async addWorker(login) {
        const ListUsers = await this.ctx.stub.getState(this.KEY);
        const users = JSON.parse(ListUsers.toString());
        users[login].role = "Worker";
        const DataUsers = Buffer.from(JSON.stringify(users));
        await this.ctx.stub.putState(this.KEY, DataUsers);
    }
}

class User {
    constructor(id, login, role) { //role "User" and "Worker"
        this.id = id;
        this.login = login;
        this.role = role;
        this.balance = 1000;
        this.onOffer = false;
    } 
}

class UserCTX extends Context {
    constructor() {
        super();
        this.userList = new UserList(this);
    }
}

class UsersContract extends Contract {
    createContext() {
        return new UserCTX();
    }
    async initializationContract(ctx) {
        const users = {};

        await ctx.userList.createUsers(users);
        return users;
    }
    async registration(ctx, login) {
        const users = await ctx.userList.getUsers();
        if (users[login]) {
            return new Error("You are already registered")
        }
        const user = new User(Object.keys(users).length, login, "User", false);
        await ctx.userList.addUser(user);
        return user;
    }
    async getUser(ctx, login) {
        return await ctx.userList.getUser(login);
    }
    async getUsers(ctx) {
        return await ctx.userList.getUsers();
    }
}

module.exports.UserList = UserList;
module.exports.UsersContract = UsersContract;