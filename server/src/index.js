import cookieParser from "cookie-parser";
import express, { json } from "express";
import cors from "cors";
import { CONTRACTS, PORT, TRANSACTIONS } from "./configs";
import { errorHandler } from "./middlewares";
import { Fabric } from "./services";
import { router } from "./routes";

const app = express();

app.use(json());
app.use(cookieParser());
app.use(cors());
app.use("/", router);

app.use(errorHandler);

app.listen(PORT, async () => {
	/* const login = "admin";
	const org = "org1";
	const password = "adminpw";
	await Fabric.loginIdentity(login, password, org);
	await Fabric.transaction(
		org,
		login,
		CONTRACTS.USERS,
		TRANSACTIONS.USERS.INIT
	);
	await Fabric.transaction(
		org,
		login,
		CONTRACTS.OFFERS,
		TRANSACTIONS.OFFERS.INIT
	); */
	console.log("OR");
});
