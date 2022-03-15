"use strict";

const { Contract, Context } = require("fabric-contract-api");

class UserList {
	constructor(ctx) {
		this.ctx = ctx;
		this.KEY = "users";
	}
	async setUsers(users) {
		const DataUsers = Buffer.from(JSON.stringify(users));
		await this.ctx.stub.putState(this.KEY, DataUsers);
	}
	async addUser(login, user) {
		const users = await this.getUsers();
		users[login] = user;
		await this.setUsers(users);
	}
	async getUsers() {
		const ListUsers = await this.ctx.stub.getState(this.KEY);
		const users = JSON.parse(ListUsers.toString());
		return users;
	}
	async getUser(login) {
		const users = await this.getUsers();
		return users[login];
	}
	async sendMoney(login, money) {
		const users = await this.getUsers();
		console.debug(users);
		users[login].balance = users[login].balance - money;
		console.debug(users);
		await this.setUsers(users);
	}
	async recieveMoney(login, money) {
		const users = await this.getUsers();
		console.debug(users);
		users[login].balance = users[login].balance + +money;
		console.debug(users);
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
		users[login].role = "Worker";
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

		return users.filter((user) => user.role === "Worker");
	}
}

class User {
	constructor(id, login, role) {
		//role "User" and "Worker"
		this.id = id;
		this.login = login;
		this.role = role;
		this.balance = 1000;
		this.onOffer = false;
		this.cars = [];
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
		const users = {
			worker: new User(0, "worker", "Worker"),
			user: new User(1, "user", "User"),
		};
		await ctx.userList.setUsers(users);
		return users;
	}
	async registration(ctx, login) {
		const users = await ctx.userList.getUsers();
		if (users[login]) {
			return new Error("You are already registered");
		}
		const user = new User(Object.keys(users).length, login, "User", false);
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

module.exports.UserList = UserList;
module.exports.UsersContract = UsersContract;
