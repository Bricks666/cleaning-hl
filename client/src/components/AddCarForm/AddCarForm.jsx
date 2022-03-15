import { useDispatch } from "react-redux";
import { useField } from "../../hooks";
import { addCarThunk } from "../../models/cars";

export const AddCarForm = () => {
	const [number, setNumber, resetNumber] = useField("");
	const [brand, setBrand, resetBrand] = useField("");
	const dispatch = useDispatch();

	const onSubmit = async (evt) => {
		evt.preventDefault();
		await dispatch(addCarThunk(number, brand));
		resetNumber();
		resetBrand();
	};

	return (
		<form onSubmit={onSubmit}>
			<input
				value={number}
				maxLength="12"
				onChange={setNumber}
				placeholder="Auto number"
			/>
			<input
				value={brand}
				onChange={setBrand}
				placeholder="Auto brand"
				maxLength="20"
			/>
			<button>Add</button>
		</form>
	);
};
