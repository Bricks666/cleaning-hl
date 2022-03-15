import { useCallback } from "react";
import { useDispatch } from "react-redux";
import { useCars, useField } from "../../hooks";
import { addOfferThunk } from "../../models/offers";

export const AddOfferForm = () => {
	const cars = useCars();
	const [carId, setCarId, resetCarId] = useField(-1);
	const [worker, setWorker, resetWorker] = useField("");
	const [money, setMoney, resetMoney] = useField(0);
	const dispatch = useDispatch();

	const onSubmit = useCallback(
		async (evt) => {
			evt.preventDefault();
			await dispatch(addOfferThunk(carId, worker, money));
			resetCarId();
			resetWorker();
			resetMoney();
		},
		[dispatch, carId, resetWorker, worker, resetCarId, money, resetMoney]
	);

	return (
		<form onSubmit={onSubmit}>
			<select value={carId} onChange={setCarId}>
				<option value={-1} />
				{cars.map((car) => (
					<option value={car.id} key={car.id}>
						{car.number}
					</option>
				))}
			</select>
			<input value={worker} onChange={setWorker} />
			<input
				value={money}
				onChange={setMoney}
				placeholder="money for cleaning"
				min="0"
				max="900"
				type="number"
			/>
			<button>Send offer</button>
		</form>
	);
};
