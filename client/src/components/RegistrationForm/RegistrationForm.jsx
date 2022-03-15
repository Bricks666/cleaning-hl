import { useDispatch } from "react-redux";
import { useNavigate } from "react-router";
import { useField } from "../../hooks";
import { registrationThunk } from "../../models/auth";

export const RegistrationForm = () => {
	const [login, onChange, reset] = useField("");
	const dispatch = useDispatch();
	const navigate = useNavigate();

	const onSubmit = async (evt) => {
		evt.preventDefault();
		const response = await dispatch(registrationThunk(login));
		if (response) {
			navigate("/login");
		} else {
			reset();
		}
	};
	return (
		<form onSubmit={onSubmit}>
			<input value={login} onChange={onChange} placeholder="login" />
			<button>Login</button>
		</form>
	);
};
