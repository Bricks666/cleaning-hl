import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loadSendedOffersThunk } from "../../models/offers";

export const useSendedOffers = () => {
  const offers = useSelector((state) => state.offers.sended);

  const dispatch = useDispatch();

  useEffect(() => {
    if (!offers.length) {
      dispatch(loadSendedOffersThunk());
    }
  }, [dispatch]);

  return offers;
};
