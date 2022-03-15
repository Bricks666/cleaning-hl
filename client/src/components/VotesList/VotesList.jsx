import { useVotes } from "./useVotes";
import { Loading } from "../Loading";
import { VoteCard } from "../VoteCard";

export const VotesList = () => {
	const { isLoading, votes } = useVotes();
	return (
		<Loading isLoading={isLoading}>
			<ul>
				{votes.map((vote) => (
					<li key={vote.id}>
						<VoteCard {...vote} />
					</li>
				))}
			</ul>
		</Loading>
	);
};
