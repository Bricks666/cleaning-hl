"use strict";

const { Contract, Context } = require("fabric-contract-api");
const { UserList } = require("./Users");

class Cars {
	constructor(id, login, number, brand) {
		this.id = id;
		this.login = login;
		this.onClean = false;
		this.number = number;
		this.brand = brand;
	}
}

class CarsCTX extends Context {
	constructor() {
		super();
		this.userList = new UserList(this);
	}
}

class CarsContract extends Contract {
	createContext() {
		return new CarsCTX();
	}
	async initializationContract() {}
	async addCars(ctx, login, number, brand) {
		const users = await ctx.userList.getUsers();
		const car = new Cars(users[login].cars.length, login, number, brand);
		await ctx.userList.addCars(login, car);
		return car;
	}
	async getCarsUser(ctx, login) {
		const users = await ctx.userList.getUsers();
		return users[login].cars;
	}
}

module.exports.CarsContract = CarsContract;
