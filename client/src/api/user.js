import { instance } from "./core";

export const getUser = async () => {
	const response = await instance.get("/user/me");
	return response.data.user;
};
export const getUsers = async () => {
	const response = await instance.get("/user");
	return response.data.users;
};
