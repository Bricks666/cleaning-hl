export const PORT = 5000;
export const CHANNEL = "mychannel";
export const CHAINCODE = "cleaning";
export const COOKIE_NAME = "sdcvsdzdfasd";
export const CONTRACTS = {
	USERS: "UsersContract",
	OFFERS: "CleaningContract",
	VOTES: "OfferContract",
	CARS: "CarsContract",
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
		GET_SENDED: "getSendedOffers",
		GET_RECEIVED: "getReceivedOffers",
		ADD: "addOfferCleaning",
		ACCEPT: "acceptOfferCleaning",
		CANCEL: "cancelOfferCleaning",
	},
	VOTES: {
		INIT: "initializationContract",
		GET: "getOffers",
		ADD: "addOfferToWorker",
		VOTE_FOR: "voteFor",
		VOTE_AGAINST: "voteAgainst",
	},
	CARS: {
		INIT: "initializationContract",
		GET: "getCarsUser",
		ADD: "addCars",
	},
};
