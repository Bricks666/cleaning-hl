import { instance } from "./core";

export const getSendedOffers = async () => {
	const response = await instance.get("/offers/sended");
	return response.data.offers;
};
export const getReceivedOffers = async () => {
	const response = await instance.get("/offers/received");
	return response.data.offers;
};

export const addOffer = async (carId, worker, money) => {
	const response = await instance.put("/offers/add", {
		carId,
		worker,
		money,
	});

	return response.data.offer;
};

export const acceptOffer = async (offerId) => {
	const response = await instance.post(`/offers/${offerId}/accept`);
	return response.data.offer;
};
export const cancelOffer = async (offerId) => {
	const response = await instance.post(`/offers/${offerId}/cancel`);
	return response.data.offer;
};
