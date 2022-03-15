export const UserInfo = ({ login, role, onOffer }) => {
	return (
		<dl>
			<dt>Login:</dt>
			<dd>{login}</dd>
			<dt>Role:</dt>
			<dd>{role}</dd>
			<dt>On offer:</dt>
			<dd>{onOffer ? "Yes" : "No"}</dd>
		</dl>
	);
};
