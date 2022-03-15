/*
state: {
    isLoading: boolean;
    list: Car[]
}

Car {
    id: number;
    owner: string;
    number: number;
    brand: string
}
*/

import { API } from "../api";
import { toValidCar } from "../utils";
import { LOGOUT } from "./auth";

export const SET_CARS = "transfer/cars/SET_CARS";
export const ADD_CAR = "transfer/cars/ADD_CAR";
export const TOGGLE_LOADING = "transfer/cars/TOGGLE_LOADING";

const initialState = {
	isLoading: false,
	list: [],
};

export const carsReducer = (state = initialState, { type, payload }) => {
	switch (type) {
		case SET_CARS: {
			return {
				...state,
				list: payload.cars,
			};
		}
		case TOGGLE_LOADING: {
			return { ...state, isLoading: payload.isLoading };
		}
		case ADD_CAR: {
			return {
				...state,
				list: [...state.list, payload.car],
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

export const setCarsAC = (cars) => {
	return {
		type: SET_CARS,
		payload: {
			cars,
		},
	};
};

export const addCarAC = (car) => {
	return {
		type: ADD_CAR,
		payload: {
			car,
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

export const loadCarsThunk = () => {
	return async (dispatch) => {
		try {
			dispatch(toggleLoadingAC(true));
			const cars = await API.getCars();

			dispatch(setCarsAC(cars.map(toValidCar)));
		} catch (e) {
			console.log(e);
		} finally {
			dispatch(toggleLoadingAC(false));
		}
	};
};

export const addCarThunk = (number, brand) => {
	return async (dispatch) => {
		try {
			const car = await API.addCar(number, brand);
			dispatch(addCarAC(toValidCar(car)));
		} catch (e) {
			console.log(e);
		}
	};
};
