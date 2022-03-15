import { NavLink } from "react-router-dom";
import { useUserLoading } from "../../hooks";
import { WorkerNavigation } from "../WorkerNavigation";
import { Loading } from "../Loading";

const navigation = [
	{
		path: "/profile",
		label: "Profile",
	},
	{
		path: "/cars",
		label: "Cars",
	},
	{
		path: "/offers",
		label: "Cleaning offers",
	},
];

const workerNavigation = [
	{
		path: "/votes",
		label: "Votes",
	},
];

export const Navigation = () => {
	const isLoading = useUserLoading();
	return (
		<Loading isLoading={isLoading}>
			<nav>
				<ul>
					{navigation.map(({ path, label }) => (
						<li key={path}>
							<NavLink to={path}>{label}</NavLink>
						</li>
					))}
					<WorkerNavigation>
						{workerNavigation.map(({ path, label }) => (
							<li key={path}>
								<NavLink to={path}>{label}</NavLink>
							</li>
						))}
					</WorkerNavigation>
				</ul>
			</nav>
		</Loading>
	);
};
