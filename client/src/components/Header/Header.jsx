import { Navigation } from "../Navigation";
import { useLogout } from "./useLogout";

export const Header = () => {
  const logout = useLogout();
  return (
    <header>
      <Navigation />
      <button onClick={logout}>Logout</button>
    </header>
  );
};
