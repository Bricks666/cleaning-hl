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
app.use(
	cors({
		origin: /localhost:300[012345]/,
		credentials: true,
	})
);
app.use("/", router);

app.use(errorHandler);

app.listen(PORT, async () => {
	const login = "admin";
	const org = "org1";
	const password = "adminpw";
	await Fabric.loginIdentity(login, password, org);
	const inits = Object.keys(CONTRACTS).map((key) =>
		Fabric.transaction(org, login, CONTRACTS[key], TRANSACTIONS[key].INIT)
	);
	inits.push(Fabric.registerIdentity("worker", "0000"));
	inits.push(Fabric.registerIdentity("user", "0000"));
	await Promise.all(inits);
	console.log("OR");
});
