export class CleaningOffer {
	readonly id: number;
	readonly loginUser: string;
	readonly loginWorker: string;
	readonly carId: number;
	readonly money: number;
	finished: boolean;

	constructor(
		id: number,
		loginUser: string,
		loginWorker: string,
		carId: number,
		money: number
	) {
		this.id = id;
		this.loginUser = loginUser;
		this.loginWorker = loginWorker;
		this.carId = carId;
		this.money = money;
		this.finished = false;
	}
}
