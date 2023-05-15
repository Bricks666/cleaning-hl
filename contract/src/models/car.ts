export class Car {
	readonly id: number;
	readonly login: string;
	readonly number: number;
	readonly brand: string;
	onClean: boolean;

	constructor(id: number, login: string, number: number, brand: string) {
		this.id = id;
		this.login = login;
		this.onClean = false;
		this.number = number;
		this.brand = brand;
	}
}
