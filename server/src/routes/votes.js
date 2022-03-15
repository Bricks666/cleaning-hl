import { Router } from "express";
import { accessVerify, roleAccept } from "../middlewares";
import { VotesControllers } from "../controllers";

const router = Router();

router.get("/", accessVerify, roleAccept("Worker"), VotesControllers.getVotes);
router.put(
	"/add",
	accessVerify,
	roleAccept("Worker"),
	VotesControllers.addVote
);
router.post(
	"/:voteId/for",
	accessVerify,
	roleAccept("Worker"),
	VotesControllers.voteFor
);
router.post(
	"/:voteId/against",
	accessVerify,
	roleAccept("Worker"),
	VotesControllers.voteAgainst
);

export default router;
