import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loadCarsThunk } from "../models/cars";

export const useCars = () => {
	const cars = useSelector((state) => state.cars.list);
	const dispatch = useDispatch();

	useEffect(() => {
		if (!cars.length) {
			dispatch(loadCarsThunk());
		}
	}, [dispatch, cars.length]);

	return cars;
};
