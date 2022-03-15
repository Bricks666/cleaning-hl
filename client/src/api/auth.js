import { instance } from "./core";

export const login = async (login) => {
	const response = await instance.post("/auth/login", { login });
	return response.data.user;
};

export const registration = async (login) => {
	const response = await instance.put("/auth/registration", { login });
	return response.data;
};
