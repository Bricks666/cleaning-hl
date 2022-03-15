/*
votes:{
  isLoading: boolean;
  list: vote[]
}

vote: {
  id: number
  candidate: string
  voteFor: string[]
  voteAgainst: string;
  finished: boolean
}
*/

import { API } from "../api";
import { toValidVote } from "../utils/toValidVote";
import { LOGOUT } from "./auth";
import { changeStatusAC } from "./users";

const SET_VOTES = "transfer/votes/SET_VOTES";
const ADD_VOTE = "transfer/votes/ADD_VOTE";
const FINISH = "transfer/votes/FINISH";
const TOGGLE_LOADING = "transfer/votes/TOGGLE_LOADING";

const initialState = {
	isLoading: false,
	list: [],
};

export const votesReducer = (state = initialState, { type, payload }) => {
	switch (type) {
		case SET_VOTES: {
			return {
				...state,
				list: payload.votes,
			};
		}
		case ADD_VOTE: {
			return {
				...state,
				list: [...state.list, payload.vote],
			};
		}
		case FINISH: {
			return {
				...state,
				list: state.list.map((vote) =>
					vote.id === payload.voteId ? { ...vote, finished: true } : vote
				),
			};
		}
		case TOGGLE_LOADING: {
			return {
				...state,
				isLoading: payload.isLoading,
			};
		}
		case LOGOUT: {
			return initialState;
		}
		default: {
			return state;
		}
	}
};

const setVotesAC = (votes) => {
	return {
		type: SET_VOTES,
		payload: {
			votes,
		},
	};
};

const addVoteAC = (vote) => {
	return {
		type: ADD_VOTE,
		payload: {
			vote,
		},
	};
};

const finishVoteAC = (voteId) => {
	return {
		type: FINISH,
		payload: {
			voteId,
		},
	};
};

const toggleLoadingAC = (isLoading) => {
	return {
		type: TOGGLE_LOADING,
		payload: {
			isLoading,
		},
	};
};

export const loadVotesThunk = () => {
	return async (dispatch) => {
		try {
			dispatch(toggleLoadingAC(true));
			const votes = await API.getVotes();
			dispatch(setVotesAC(votes.map(toValidVote)));
		} catch (e) {
			console.log(e);
		} finally {
			dispatch(toggleLoadingAC(false));
		}
	};
};

export const addVoteThunk = (candidate) => {
	return async (dispatch) => {
		try {
			const vote = await API.addVote(candidate);
			dispatch(addVoteAC(toValidVote(vote)));
			dispatch(changeStatusAC(candidate, { onOffer: true }));
		} catch (e) {
			console.log(e);
		}
	};
};

export const voteForThunk = (voteId) => {
	return async (dispatch, getState) => {
		try {
			const isFinish = await API.voteFor(voteId);
			if (isFinish) {
				dispatch(finishVoteAC(voteId));
				const vote = getState().votes.list.find((vote) => vote.id === +voteId);
				dispatch(
					changeStatusAC(vote.candidate, { onOffer: false, role: "Worker" })
				);
			}
		} catch (e) {
			console.log(e);
		}
	};
};

export const voteAgainstThunk = (voteId) => {
	return async (dispatch, getState) => {
		try {
			const isFinish = await API.voteAgainst(voteId);
			if (isFinish) {
				dispatch(finishVoteAC(voteId));
				const vote = getState().votes.list.find((vote) => vote.id === +voteId);
				dispatch(changeStatusAC(vote.candidate, { onOffer: false }));
			}
		} catch (e) {
			console.log(e);
		}
	};
};
