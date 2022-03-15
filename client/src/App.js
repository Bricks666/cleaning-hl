import { Navigate, Route, Routes } from "react-router";
import { routes } from "./routes";
import { Header } from "./components/Header";

export const App = () => {
	return (
		<>
			<Routes>
				<Route path="/login" element={null} />
				<Route path="/registration" element={null} />
				<Route path="*" element={<Header />} />
			</Routes>
			<Routes>
				{routes.map(({ path, Component }) => (
					<Route path={path} element={<Component />} key={path} />
				))}
				<Route path="*" element={<Navigate to="/profile" replace={true} />} />
			</Routes>
		</>
	);
};
