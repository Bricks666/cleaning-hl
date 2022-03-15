import axios from "axios";

let accessToken = null;

export const instance = axios.create({
	baseURL: "http://localhost:5000",
	withCredentials: true,
});

instance.interceptors.request.use((config) => {
	config.headers.Authorization = `Bearer ${accessToken}`;
	return config;
});

instance.interceptors.response.use(
	(response) => {
		console.log(response);
		const data = response.data;

		if ("accessToken" in data) {
			accessToken = data.accessToken;
		}

		return response;
	},
	(err) => {
		console.log(err);
		throw err;
	}
);
