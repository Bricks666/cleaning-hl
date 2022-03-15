/*
state: {
  isLoading: boolean;
  list: user[]
}
user {
  login: string
  role: "User" | "Worker"
  onOffer: boolean
}
*/
import { API } from "../api";
import { LOGOUT } from "./auth";
import { toValidInfo } from "../utils";

const SET_USERS = "transfer/users/SET_USERS";
const CHANGE_STATUS = "transfer/users/CHANGE_STATUS";
const TOGGLE_LOADING = "transfer/users/TOGGLE_LOADING";

const initialState = {
	isLoading: false,
	list: [],
};

export const usersReducer = (state = initialState, { type, payload }) => {
	switch (type) {
		case SET_USERS: {
			return {
				...state,
				list: payload.users,
			};
		}
		case CHANGE_STATUS: {
			return {
				...state,
				list: state.list.map((user) =>
					user.login === payload.login ? { ...user, ...payload.status } : user
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

const setUsersAC = (users) => {
	return {
		type: SET_USERS,
		payload: {
			users,
		},
	};
};

export const changeStatusAC = (login, { role, onOffer }) => {
	return {
		type: CHANGE_STATUS,
		payload: {
			login,
			status: {
				role,
				onOffer,
			},
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

export const loadUsersThunk = () => {
	return async (dispatch) => {
		try {
			dispatch(toggleLoadingAC(true));
			const users = await API.getUsers();

			dispatch(setUsersAC(Object.values(users).map(toValidInfo)));
		} catch (e) {
			console.log(e);
		} finally {
			dispatch(toggleLoadingAC(false));
		}
	};
};
