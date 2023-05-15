import { Context } from 'fabric-contract-api';
import { UserList } from './users';

export class CarsCTX extends Context {
	readonly userList: UserList;

	constructor() {
		super();
		this.userList = new UserList(this);
	}
}
