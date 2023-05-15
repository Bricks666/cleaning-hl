import { CarsCTX } from '@/contexts';
import { Car } from '@/models';
import { Context, Contract } from 'fabric-contract-api';

export class CarsContract extends Contract {
	createContext() {
		return new CarsCTX();
	}
	async initializationContract() {}
	async addCars(
		ctx: CarsCTX,
		login: string,
		number: number,
		brand: string
	): Promise<Car> {
		const users = await ctx.userList.getUsers();
		const car = new Car(users[login].cars.length, login, number, brand);
		await ctx.userList.addCars(login, car);
		return car;
	}
	async getCarsUser(ctx: CarsCTX, login: string): Promise<Car[]> {
		const users = await ctx.userList.getUsers();
		return users[login].cars;
	}
}
