import { login, registration } from "./auth";
import { getUser, getUsers } from "./user";
import { getCars, addCar } from "./cars";
import {
	addOffer,
	getReceivedOffers,
	getSendedOffers,
	acceptOffer,
	cancelOffer,
} from "./offers";
import { getWorkers } from "./workers";
import { getVotes, addVote, voteAgainst, voteFor } from "./votes";

export const API = {
	login,
	registration,
	getUser,
	getUsers,
	getCars,
	addCar,
	getReceivedOffers,
	getSendedOffers,
	addOffer,
	acceptOffer,
	cancelOffer,
	getWorkers,
	getVotes,
	addVote,
	voteAgainst,
	voteFor,
};
