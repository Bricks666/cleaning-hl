import { Offer } from "../../Offer";
import { useActions } from "./useActions";

export const OfferWithActions = ({ id, ...props }) => {
  const { accept, cancel } = useActions(id);
  return (
    <Offer {...props}>
      {!props.finished && (
        <>
          <button onClick={accept}>Accept</button>
          <button onClick={cancel}>Cancel</button>
        </>
      )}
    </Offer>
  );
};
