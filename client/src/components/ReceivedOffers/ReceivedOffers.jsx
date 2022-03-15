import { Loading } from "../Loading";
import { useLoadingReceivedOffers } from "./useLoadingReceivedOffers";
import { useReceivedOffers } from "./useReceivedOffers";
import { OfferWithActions } from "./OfferWithActions";

export const ReceivedOffers = () => {
  const offers = useReceivedOffers();
  const isLoading = useLoadingReceivedOffers();

  return (
    <Loading isLoading={isLoading}>
      <ul>
        {offers.map((offer) => (
          <li key={offer.id}>
            <OfferWithActions {...offer} />
          </li>
        ))}
      </ul>
    </Loading>
  );
};
