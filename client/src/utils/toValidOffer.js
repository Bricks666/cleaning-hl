export const toValidOffer = (offer) => ({
	id: offer.id,
	carId: offer.carId,
	worker: offer.loginWorker,
	member: offer.loginUser,
	money: offer.money,
	finished: offer.finished,
});
