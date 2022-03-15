/*
state: {
    isLoading: boolean
    sended: Offer[]
    received: Offer[]
}
Offer {
    id: number;
    carId: number;
    worker: string;
    member: string;
    finished: boolean
}
*/

import { API } from "../api";
import { toValidOffer } from "../utils";
import { LOGOUT } from "./auth";
import { changeBalanceAC } from "./user";

export const SET_SENDED_OFFERS = "transfers/offers/SET_SENDED_OFFERS";
export const SET_RECEIVED_OFFERS = "transfers/offers/SET_RECEIVED_OFFERS";
export const TOGGLE_LOADING = "transfers/offers/TOGGLE_LOADING";
export const CHANGE_STATUS = "transfers/offers/CHANGE_STATUS";
export const ADD_OFFER = "transfers/offers/ADD_OFFER";

const offerHere = (offers, offerId) =>
	!!offers.find((offer) => +offer.id === +offerId);

const finishOffer = (offers, offerId) =>
	offers.map((offer) =>
		+offer.id === +offerId ? { ...offer, finished: true } : offer
	);

const initialState = {
	isLoading: false,
	sended: [],
	received: [],
};

export const offersReducer = (state = initialState, { type, payload }) => {
	switch (type) {
		case SET_SENDED_OFFERS: {
			return {
				...state,
				sended: payload.offers,
			};
		}
		case ADD_OFFER: {
			return {
				...state,
				sended: [...state.sended, payload.offer],
			};
		}
		case SET_RECEIVED_OFFERS: {
			return {
				...state,
				received: payload.offers,
			};
		}
		case TOGGLE_LOADING: {
			return {
				...state,
				isLoading: payload.isLoading,
			};
		}
		case CHANGE_STATUS: {
			return {
				...state,
				sended: offerHere(state.sended, payload.offerId)
					? finishOffer(state.sended, payload.offerId)
					: state.sended,

				received: offerHere(state.received, payload.offerId)
					? finishOffer(state.received, payload.offerId)
					: state.received,
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

export const setSendedOffersAC = (offers) => {
	return {
		type: SET_SENDED_OFFERS,
		payload: {
			offers,
		},
	};
};

export const addOfferAC = (offer) => {
	return {
		type: ADD_OFFER,
		payload: {
			offer,
		},
	};
};

export const setReceivedOffersAC = (offers) => {
	return {
		type: SET_RECEIVED_OFFERS,
		payload: {
			offers,
		},
	};
};

export const toggleLoadingAC = (isLoading) => {
	return {
		type: TOGGLE_LOADING,
		payload: {
			isLoading,
		},
	};
};

export const finishOfferAC = (offerId) => {
	return {
		type: CHANGE_STATUS,
		payload: {
			offerId,
		},
	};
};

export const loadSendedOffersThunk = () => {
	return async (dispatch) => {
		try {
			dispatch(toggleLoadingAC(true));
			const offers = await API.getSendedOffers();

			dispatch(setSendedOffersAC(offers.map(toValidOffer)));
		} catch (e) {
			console.log(e);
		} finally {
			dispatch(toggleLoadingAC(false));
		}
	};
};

export const loadReceivedOffersThunk = () => {
	return async (dispatch) => {
		try {
			dispatch(toggleLoadingAC(true));
			const offers = await API.getReceivedOffers();

			dispatch(setReceivedOffersAC(offers.map(toValidOffer)));
		} catch (e) {
			console.log(e);
		} finally {
			dispatch(toggleLoadingAC(false));
		}
	};
};

export const addOfferThunk = (carId, worker, money) => {
	return async (dispatch) => {
		try {
			const offer = await API.addOffer(carId, worker, money);
			dispatch(addOfferAC(toValidOffer(offer)));
			dispatch(changeBalanceAC(-offer.money));
		} catch (e) {
			console.log(e);
		}
	};
};

export const acceptOfferThunk = (offerId) => {
	return async (dispatch, getState) => {
		try {
			await API.acceptOffer(offerId);
			dispatch(finishOfferAC(+offerId));
			const offer = getState().offers.received.find(
				(offer) => offer.id === +offerId
			);
			debugger;
			dispatch(changeBalanceAC(offer.money));
		} catch (e) {
			console.log(e);
		}
	};
};

export const cancelOfferThunk = (offerId) => {
	return async (dispatch) => {
		try {
			await API.cancelOffer(offerId);
			dispatch(finishOfferAC(+offerId));
		} catch (e) {
			console.log(e);
		}
	};
};
