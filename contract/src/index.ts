import {
	CarsContract,
	CleaningOfferContract,
	UsersContract,
	WorkerOffersContract,
} from './contracts';

const _CarsContract = CarsContract;
export { _CarsContract as CarsContract };
const _OfferContract = WorkerOffersContract;
export { _OfferContract as OfferContract };
const _CleaningContract = CleaningOfferContract;
export { _CleaningContract as CleaningContract };
const _UsersContract = UsersContract;
export { _UsersContract as UsersContract };
export const contracts = [
	UsersContract,
	CleaningOfferContract,
	WorkerOffersContract,
	CarsContract,
];
