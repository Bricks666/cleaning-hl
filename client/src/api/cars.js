import { instance } from "./core";

export const getCars = async () => {
	const response = await instance.get("/cars");
	return response.data.cars;
};

export const addCar = async (number, brand) => {
	const response = await instance.put("/cars/add", { number, brand });
	return response.data.car;
};
