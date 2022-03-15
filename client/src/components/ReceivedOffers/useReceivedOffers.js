import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loadReceivedOffersThunk } from "../../models/offers";

export const useReceivedOffers = () => {
  const offers = useSelector((state) => state.offers.received);
  const dispatch = useDispatch();

  useEffect(() => {
    if (!offers.length) {
      dispatch(loadReceivedOffersThunk());
    }
  }, [dispatch, offers.length]);

  return offers;
};
