import { Fabric } from ".";
import { CONTRACTS, TRANSACTIONS } from "../configs";

export class AuthServices {
	static async login(login) {
		await Fabric.loginIdentity(login, "0000");
		return await Fabric.transaction(
			"org1",
			login,
			CONTRACTS.USERS,
			TRANSACTIONS.USERS.GET_ONE,
			login
		);
	}
	static async registration(login) {
		await Fabric.registerIdentity(login, "0000");
		return await Fabric.transaction(
			"org1",
			login,
			CONTRACTS.USERS,
			TRANSACTIONS.USERS.REG,
			login
		);
	}
}
