import { useSendedOffers } from "./useSendedOffers";
import { useLoadingSendedOffers } from "./useLoadingSendedOffers";
import { Loading } from "../Loading";
import { Offer } from "../Offer";

export const SendedOffers = () => {
  const offers = useSendedOffers();
  const isLoading = useLoadingSendedOffers();
  return (
    <Loading isLoading={isLoading}>
      <ul>
        {offers.map((offer) => (
          <li key={offer.id}>
            <Offer {...offer} />
          </li>
        ))}
      </ul>
    </Loading>
  );
};
