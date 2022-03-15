import { Navigate, Route, Routes } from "react-router";
import { AddOfferForm } from "../components/AddOfferForm/AddOfferForm";
import { OfferNavigation } from "../components/OfferNavigation";
import { SendedOffers } from "../components/SendedOffers";
import { RoleRoute } from "../components/RoleRoute";
import { ReceivedOffers } from "../components/ReceivedOffers";

export const OffersPage = () => {
  return (
    <main>
      <h2>Offers</h2>
      <OfferNavigation />
      <Routes>
        <Route
          path="sended"
          element={
            <>
              <AddOfferForm />
              <SendedOffers />
            </>
          }
        />
        <Route
          path="received"
          element={
            <RoleRoute acceptedRole="Worker">
              <ReceivedOffers />
            </RoleRoute>
          }
        />
        <Route path="*" element={<Navigate to="sended" replace={true} />} />
      </Routes>
    </main>
  );
};
