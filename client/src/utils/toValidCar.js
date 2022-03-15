export const toValidCar = (car) => ({
	id: car.id,
	owner: car.login,
	number: car.number,
	brand: car.brand,
});
