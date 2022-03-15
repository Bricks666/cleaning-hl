export const filterSendedOffers = (address, offers) =>
  offers.filter((offer) => offer.loginUser === address);
