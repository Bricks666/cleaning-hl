/*
sttae {
    isLoading: boolean;
    info: {
        login: string;
        role: number;
    }
}
*/

import { API } from "../api";
import { toValidInfo } from "../utils/toValidInfo";
import { LOGOUT } from "./auth";

export const TOGGLE_LOADING = "transfer/user/TOGGLE_LOADING";
export const SET_INFO = "transfer/user/SET_INFO";
export const CHANGE_BALANCE = "transfer/user/CHANGE_BALANCE";

const initialState = {
	isLoading: false,
	info: {
		login: "",
		role: "",
		onOffer: false,
		balance: 0,
	},
};

export const userReducer = (state = initialState, { type, payload }) => {
	switch (type) {
		case SET_INFO: {
			return {
				...state,
				info: payload.info,
			};
		}
		case TOGGLE_LOADING: {
			return {
				...state,
				isLoading: payload.isLoading,
			};
		}
		case CHANGE_BALANCE: {
			return {
				...state,
				info: {
					...state.info,
					balance: state.info.balance + +payload.change,
				},
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

export const setInfoAC = (info) => {
	return {
		type: SET_INFO,
		payload: {
			info,
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

export const changeBalanceAC = (change) => {
	return {
		type: CHANGE_BALANCE,
		payload: {
			change,
		},
	};
};

export const loadUserInfoThunk = () => {
	return async (dispatch) => {
		try {
			dispatch(toggleLoadingAC(true));
			const info = await API.getUser();

			dispatch(setInfoAC(toValidInfo(info)));
		} catch (e) {
			console.log(e);
		} finally {
			dispatch(toggleLoadingAC(false));
		}
	};
};
