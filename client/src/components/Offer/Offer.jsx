export const Offer = ({ carId, worker, member, finished, money, children }) => {
	return (
		<div>
			<p>CarId: {carId}</p>
			<p>Worker: {worker}</p>
			<p>Consumer: {member}</p>
			<p>Money: {money}</p>
			<p>Status: {finished ? "Finished" : "Pending"}</p>
			{children}
		</div>
	);
};
