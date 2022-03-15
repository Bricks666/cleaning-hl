/*
state {
    isLogin: boolean;
}
*/

import { API } from "../api";

export const LOGIN = "transfer/auth/LOGIN";
export const LOGOUT = "transfer/auth/LOGOUT";

const initialState = {
	isLogin: false,
	login: null,
};

export const authReducer = (state = initialState, { type, payload }) => {
	switch (type) {
		case LOGIN: {
			return {
				...state,
				isLogin: true,
				login: payload.login,
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

export const loginAC = (login) => {
	return {
		type: LOGIN,
		payload: {
			login,
		},
	};
};

export const logoutAC = () => {
	return {
		type: LOGOUT,
	};
};

export const loginThunk = (login) => {
	return async (dispatch) => {
		try {
			const user = await API.login(login);
			dispatch(loginAC(user.login));
			return true;
		} catch (e) {
			console.log(e);
		}
	};
};

export const logoutThunk = () => {
	return async (dispatch) => {
		try {
			dispatch(logoutAC());
		} catch (e) {
			console.log(e);
		}
	};
};

export const registrationThunk = (login) => {
	return async () => {
		try {
			await API.registration(login);
			return true;
		} catch (e) {
			console.log(e);
		}
	};
};
