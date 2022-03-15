import { Router } from "express";
import { OfferControllers } from "../controllers";
import { accessVerify, roleAccept } from "../middlewares";

const router = Router();

router.get("/sended", accessVerify, OfferControllers.getSendedOffers);
router.get("/received", accessVerify, OfferControllers.getReceivedOffers);
router.put("/add", accessVerify, OfferControllers.addOffer);
router.post(
	"/:offerId/accept",
	accessVerify,
	roleAccept("Worker"),
	OfferControllers.acceptOffer
);
router.post(
	"/:offerId/cancel",
	accessVerify,
	roleAccept("Worker"),
	OfferControllers.cancelOffer
);

export default router;
