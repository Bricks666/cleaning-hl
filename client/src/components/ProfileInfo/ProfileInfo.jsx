import { UserInfo } from "../UserInfo";
import { Balance } from "../Balance";
import { useUserInfo, useUserLoading } from "../../hooks";
import { Loading } from "../Loading";

export const ProfileInfo = () => {
	const user = useUserInfo();
	const isLoading = useUserLoading();

	return (
		<section>
			<Loading isLoading={isLoading}>
				<UserInfo {...user} />
				<Balance balance={user.balance} />
			</Loading>
		</section>
	);
};
