import { sign, verify } from "jsonwebtoken";
import PUBLIC_KEY from "../configs/public_key.pem";
import PRIVATE_KEY from "../configs/private_key.pem";

export class Tokens {
	static sign(payload) {
		try {
			return sign(payload, PRIVATE_KEY);
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
