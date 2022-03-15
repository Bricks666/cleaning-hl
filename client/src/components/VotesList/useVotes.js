import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loadVotesThunk } from "../../models/votes";

export const useVotes = () => {
	const { isLoading, list: votes } = useSelector((state) => state.votes);
	const dispatch = useDispatch();

	useEffect(() => {
		if (!votes.length) {
			dispatch(loadVotesThunk());
		}
	}, [dispatch, votes.length]);

	return {
		isLoading,
		votes,
	};
};
