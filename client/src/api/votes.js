import { instance } from "./core";

export const getVotes = async () => {
	const response = await instance.get("/votes");
	return response.data.votes;
};

export const addVote = async (candidate) => {
	const response = await instance.put("/votes/add", { candidate });
	return response.data.vote;
};

export const voteFor = async (voteId) => {
	const response = await instance.post(`/votes/${voteId}/for`);
	return response.data.isFinish;
};

export const voteAgainst = async (voteId) => {
	const response = await instance.post(`/votes/${voteId}/against`);
	return response.data.isFinish;
};
