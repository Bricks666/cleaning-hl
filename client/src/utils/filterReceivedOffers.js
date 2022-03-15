export const filterReceivedOffers = (address, offers) =>
  offers.filter((offer) => offer.loginWorker === address);
