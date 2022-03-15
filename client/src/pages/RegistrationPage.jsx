import { Link } from "react-router-dom";
import { RegistrationForm } from "../components/RegistrationForm";

export const RegistrationPage = () => {
  return (
    <main>
      <h2>Registration Page</h2>
      <RegistrationForm />
      <Link to="/login">Login</Link>
    </main>
  );
};
