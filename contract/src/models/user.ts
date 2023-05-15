import { Car } from './car';

export type Role = 'User' | 'Worker';

export class User {
	readonly id: number;
	readonly login: string;
	role: Role;
	balance: number;
	onOffer: boolean;
	readonly cars: Car[];

	constructor(id: number, login: string, role: Role) {
		this.id = id;
		this.login = login;
		this.role = role;
		this.balance = 1000;
		this.onOffer = false;
		this.cars = [];
	}
}
