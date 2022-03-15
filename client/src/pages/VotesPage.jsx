import { Routes, Route, Navigate } from "react-router-dom";
import { VotesList } from "../components/VotesList";
import { VotesNavigation } from "../components/VotesNavigation";
import { UsersList } from "../components/UsersList";

export const VotesPage = () => {
	return (
		<main>
			<VotesNavigation />
			<Routes>
				<Route path="voting" element={<VotesList />} />
				<Route path="users" element={<UsersList />} />
				<Route path="*" element={<Navigate to="voting" replace={true} />} />
			</Routes>
		</main>
	);
};
