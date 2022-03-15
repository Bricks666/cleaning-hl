import { useCallback } from "react";
import { useDispatch } from "react-redux";
import { addVoteThunk } from "../../models/votes";
import { UserInfo } from "../UserInfo";

export const UserCard = ({ onOffer, login, role }) => {
	const dispatch = useDispatch();
	const mayBeOnVote = !onOffer && role === "User";
	const setVoteHandler = useCallback(
		() => dispatch(addVoteThunk(login)),
		[dispatch, login]
	);
	return (
		<div>
			<UserInfo onOffer={onOffer} login={login} role={role} />
			{mayBeOnVote && <button onClick={setVoteHandler}>Set on vole</button>}
		</div>
	);
};
