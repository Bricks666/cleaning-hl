import { CONTRACTS, TRANSACTIONS } from "../configs";
import { Fabric } from "./fabric";

export class CarsServices {
	static async getCars(login, org) {
		return await Fabric.transaction(
			org,
			login,
			CONTRACTS.CARS,
			TRANSACTIONS.CARS.GET,
			login
		);
	}
	static async addCar(login, org, number, brand) {
		return await Fabric.transaction(
			org,
			login,
			CONTRACTS.CARS,
			TRANSACTIONS.CARS.ADD,
			login,
			number,
			brand
		);
	}
}
