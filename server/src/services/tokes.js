import { sign, verify } from "jsonwebtoken";
import { readFileSync } from "fs";
const PUBLIC_KEY = readFileSync("./configs/public_key.pem", "utf8");
const PRIVATE_KEY = readFileSync("./configs/private_key.pem", "utf8");

export class Tokens {
	static sign(payload, time = "10m") {
		try {
			return sign(payload, PRIVATE_KEY, {
				algorithm: "RS256",
				expiresIn: time,
			});
		} catch (e) {
			return null;
		}
	}
	static verify(token) {
		try {
			return verify(token, PUBLIC_KEY);
		} catch (e) {
			return null;
		}
	}
}
