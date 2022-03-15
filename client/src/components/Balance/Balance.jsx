import { useBalance } from "../../hooks";

export const Balance = () => {
	const balance = useBalance();
	return <p>Balance: {balance}</p>;
};
