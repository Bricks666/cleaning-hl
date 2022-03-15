import { useSelector } from "react-redux";

export const useLoadingReceivedOffers = () => {
  return useSelector((state) => state.offers.isLoading);
};
