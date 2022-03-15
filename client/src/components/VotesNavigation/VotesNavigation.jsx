import { NavLink } from "react-router-dom";

const navigation = [
	{
		path: "voting",
		label: "Current voting",
	},
	{
		path: "users",
		label: "users",
	},
];

export const VotesNavigation = () => {
	return (
		<ul>
			{navigation.map(({ label, path }) => (
				<li key={path}>
					<NavLink to={path}>{label}</NavLink>
				</li>
			))}
		</ul>
	);
};
