export const toValidVote = (vote) => {
	return {
		id: vote.id,
		candidate: vote.loginToWorker,
		voteFor: vote.voteFor,
		voteAgainst: vote.voteAgainst,
		finished: vote.finished,
	};
};
