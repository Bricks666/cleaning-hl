export class WorkerOffer {
	readonly id: number;
	readonly loginToWorker: string;
	readonly voteFor: string[];
	readonly voteAgainst: string[];
	finished: boolean;

	constructor(id: number, loginToWorker: string, offererLogin: string) {
		this.id = id;
		this.loginToWorker = loginToWorker;
		this.voteFor = [offererLogin];
		this.voteAgainst = [];
		this.finished = false;
	}
}
