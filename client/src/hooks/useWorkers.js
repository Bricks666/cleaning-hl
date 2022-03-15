import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loadWorkersThunk } from "../models/workers";

export const useWorkers = () => {
	const workers = useSelector((state) => state.workers);
	const dispatch = useDispatch();

	useEffect(() => {
		if (!workers.length) {
			dispatch(loadWorkersThunk());
		}
	}, [dispatch, workers.length]);

	return workers;
};
