import { useSelector } from "react-redux";

export const useLoadingSendedOffers = () => {
  return useSelector((state) => state.offers.isLoading);
};
