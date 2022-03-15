import { VotesServices } from "../services";

export class VotesControllers {
	static async getVotes(req, res, next) {
		try {
			const { user } = req.body;

			const votes = await VotesServices.getVotes(user.login, user.org);

			return res.json({ votes });
		} catch (e) {
			next(e);
		}
	}

	static async addVote(req, res, next) {
		try {
			const { user, candidate } = req.body;

			const vote = await VotesServices.addVote(user.login, user.org, candidate);

			return res.json({ vote });
		} catch (e) {
			next(e);
		}
	}
	static async voteFor(req, res, next) {
		try {
			const { user } = req.body;
			const { voteId } = req.params;

			const isFinish = await VotesServices.voteFor(
				user.login,
				user.org,
				voteId
			);

			return res.json({ isFinish });
		} catch (e) {
			next(e);
		}
	}

	static async voteAgainst(req, res, next) {
		try {
			const { user } = req.body;
			const { voteId } = req.params;

			const isFinish = await VotesServices.voteAgainst(
				user.login,
				user.org,
				voteId
			);

			return res.json({ isFinish });
		} catch (e) {
			next(e);
		}
	}
}
