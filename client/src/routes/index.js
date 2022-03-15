import {
	RegistrationPage,
	LoginPage,
	ProfilePage,
	CarsPage,
	OffersPage,
	VotesPage,
} from "../pages";
import { AuthRoute } from "../components/AuthRoute";
import { RoleRoute } from "../components/RoleRoute";

const Profile = () => (
	<AuthRoute>
		<ProfilePage />
	</AuthRoute>
);

const Cars = () => (
	<AuthRoute>
		<CarsPage />
	</AuthRoute>
);

const Offers = () => (
	<AuthRoute>
		<OffersPage />
	</AuthRoute>
);
const Votes = () => (
	<RoleRoute acceptedRole="Worker">
		<VotesPage />
	</RoleRoute>
);

export const routes = [
	{
		path: "/login",
		Component: LoginPage,
	},
	{
		path: "/registration",
		Component: RegistrationPage,
	},
	{
		path: "/profile",
		Component: Profile,
	},
	{
		path: "/cars",
		Component: Cars,
	},
	{
		path: "/offers/*",
		Component: Offers,
	},
	{
		path: "/votes/*",
		Component: Votes,
	},
];
