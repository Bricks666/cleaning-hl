import { Fabric } from ".";
import { CONTRACTS, TRANSACTIONS } from "../configs";

export class VotesServices {
	static async getVotes(login, org) {
		return await Fabric.transaction(
			org,
			login,
			CONTRACTS.VOTES,
			TRANSACTIONS.VOTES.GET
		);
	}
	static async addVote(login, org, candidate) {
		return await Fabric.transaction(
			org,
			login,
			CONTRACTS.VOTES,
			TRANSACTIONS.VOTES.ADD,
      login,
			candidate
		);
	}
	static async voteFor(login, org, voteId) {
		return await Fabric.transaction(
			org,
			login,
			CONTRACTS.VOTES,
			TRANSACTIONS.VOTES.VOTE_FOR,
			login,
			voteId
		);
	}
	static async voteAgainst(login, org, voteId) {
		return await Fabric.transaction(
			org,
			login,
			CONTRACTS.VOTES,
			TRANSACTIONS.VOTES.VOTE_FOR,
			login,
			voteId
		);
	}
}
