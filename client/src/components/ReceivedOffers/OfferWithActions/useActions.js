import { useCallback } from "react";
import { useDispatch } from "react-redux";
import { acceptOfferThunk, cancelOfferThunk } from "../../../models/offers";

export const useActions = (offerId) => {
  const dispatch = useDispatch();

  const accept = useCallback(
    () => dispatch(acceptOfferThunk(offerId)),
    [offerId, dispatch]
  );

  const cancel = useCallback(
    () => dispatch(cancelOfferThunk(offerId)),
    [dispatch, offerId]
  );

  return {
    accept,
    cancel,
  };
};
