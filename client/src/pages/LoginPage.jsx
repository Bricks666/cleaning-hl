import { Link } from "react-router-dom";
import { LoginForm } from "../components/LoginForm";

export const LoginPage = () => {
  return (
    <main>
      <h2>Login Page</h2>
      <LoginForm />
      <Link to="/registration">Registration</Link>
    </main>
  );
};
