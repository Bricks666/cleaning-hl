export const PORT = 5000;
export const CHANNEL = "mychannel";
export const CHAINCODE = "cleaning";
export const CONTRACTS = {
	USERS: "UsersContract",
	OFFERS: "CleaningContract",
	VOTES: "OfferContract",
};

export const TRANSACTIONS = {
	USERS: {
		INIT: "initializationContract",
		REG: "registration",
		GET_ONE: "getUser",
		GET_ALL: "getUsers",
	},
	OFFERS: {
		INIT: "initializationContract",
		ADD: "addOfferCleaning",
		ACCEPT: "acceptOfferCleaning",
		CANCEL: "cancelOfferCleaning",
	},
	VOTES: {
		INIT: "initializationContract",
		ADD: "addOfferToWorker",
		VOTE_FOR: "voteFor",
	},
};
