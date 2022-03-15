import { useCallback } from "react";
import { useDispatch } from "react-redux";
import { voteForThunk, voteAgainstThunk } from "../../models/votes";

export const VoteCard = ({ candidate, voteFor, voteAgainst, finished, id }) => {
	const dispatch = useDispatch();
	const voteForHandler = useCallback(
		() => dispatch(voteForThunk(id)),
		[id, dispatch]
	);
	const voteAgainstHandler = useCallback(
		() => dispatch(voteAgainstThunk(id)),
		[id, dispatch]
	);
	return (
		<div>
			<p>Candidate: {candidate}</p>
			<p>
				Vote for:{" "}
				{voteFor.length ? (
					<ul>
						{voteFor.map((login) => (
							<li key={login}>{login}</li>
						))}
					</ul>
				) : (
					"Nobody"
				)}
			</p>
			<p>Vote against: {voteAgainst || "Nobody"}</p>
			<p>Status: {finished ? "Finished" : "Voting"}</p>
			{!finished && (
				<>
					<button onClick={voteForHandler}>For</button>
					<button onClick={voteAgainstHandler}>Against</button>
				</>
			)}
		</div>
	);
};
