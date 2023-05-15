import { Car, User } from '@/models';
import { fromBuffer, toBuffer } from '@/utils';
import { Context } from 'fabric-contract-api';

export type Users = Record<string, User>;
export type Worker = User & { role: 'Worker' };

export class UserList {
	readonly KEY: string;
	readonly ctx: Context;

	constructor(ctx: Context) {
		this.ctx = ctx;
		this.KEY = 'users';
	}
	async setUsers(users: Users): Promise<void> {
		const DataUsers = toBuffer(users);
		await this.ctx.stub.putState(this.KEY, DataUsers);
	}
	async addUser(login: string, user: User): Promise<void> {
		const users = await this.getUsers();
		users[login] = user;
		await this.setUsers(users);
	}
	async getUsers(): Promise<Users> {
		const data = await this.ctx.stub.getState(this.KEY);
		return fromBuffer(data);
	}
	async getUser(login: string): Promise<User | undefined> {
		const users = await this.getUsers();
		return users[login];
	}
	async sendMoney(login: string, money: number): Promise<void> {
		const users = await this.getUsers();
		users[login].balance = users[login].balance - money;
		await this.setUsers(users);
	}
	async recieveMoney(login: string, money: number): Promise<void> {
		const users = await this.getUsers();
		users[login].balance = users[login].balance + +money;
		await this.setUsers(users);
	}
	async addOfferToWorker(login: string): Promise<void> {
		const users = await this.getUsers();
		users[login].onOffer = true;
		await this.setUsers(users);
	}
	async removeOfferToWorker(login: string): Promise<void> {
		const users = await this.getUsers();
		users[login].onOffer = false;
		await this.setUsers(users);
	}
	async addWorker(login: string): Promise<void> {
		const users = await this.getUsers();
		users[login].role = 'Worker';
		await this.setUsers(users);
	}
	async addCars(login: string, car: Car): Promise<void> {
		const users = await this.getUsers();
		users[login].cars.push(car);
		await this.setUsers(users);
	}
	async CarToCleaning(login: string, carId: number): Promise<void> {
		const users = await this.getUsers();
		users[login].cars[carId].onClean = true;
		await this.setUsers(users);
	}
	async CarNotToCleaning(login: string, carId: number): Promise<void> {
		const users = await this.getUsers();
		users[login].cars[carId].onClean = false;
		await this.setUsers(users);
	}
	async getWorkers(): Promise<Worker[]> {
		const users = await this.getUsers();

		return Object.values(users).filter(
			(user): user is Worker => user.role === 'Worker'
		);
	}
}

export class UserCTX extends Context {
	readonly userList: UserList;
	constructor() {
		super();
		this.userList = new UserList(this);
	}
}
