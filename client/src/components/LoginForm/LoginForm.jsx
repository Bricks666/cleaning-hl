import { useDispatch } from "react-redux";
import { useNavigate } from "react-router";
import { useField } from "../../hooks";
import { loginThunk } from "../../models/auth";

export const LoginForm = () => {
	const [login, onChange, reset] = useField("");
	const dispatch = useDispatch();
	const navigate = useNavigate();

	const onSubmit = async (evt) => {
		evt.preventDefault();
		const response = await dispatch(loginThunk(login));
		if (response) {
			navigate("/");
		} else {
			reset();
		}
	};
	return (
		<form onSubmit={onSubmit}>
			<input placeholder="login" value={login} onChange={onChange} />
			<button>Login</button>
		</form>
	);
};
