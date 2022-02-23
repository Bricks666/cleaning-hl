import { Fabric } from ".";
import { CONTRACTS, TRANSACTIONS } from "../configs";

export class UserServices {
	static async getUser(login, org) {
		return await Fabric.transaction(
			org,
			login,
			CONTRACTS.USERS,
			TRANSACTIONS.USERS.GET_ONE,
			login
		);
	}
}
