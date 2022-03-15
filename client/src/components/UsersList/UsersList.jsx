import { Loading } from "../Loading";
import { useUsers } from "./useUsers";
import { UserCard } from "../UserCard";

export const UsersList = () => {
	const { isLoading, users } = useUsers();
	return (
		<Loading isLoading={isLoading}>
			<ul>
				{users.map((user) => (
					<li key={user.login}>
						<UserCard {...user} />
					</li>
				))}
			</ul>
		</Loading>
	);
};
