import { generateKeyPairSync } from "crypto";
import { writeFileSync } from "fs";

const generateKeys = () => {
	const keys = generateKeyPairSync("rsa", {
		modulusLength: 4096,
		publicKeyEncoding: {
			type: "pkcs1",
			format: "pem",
		},
		privateKeyEncoding: {
			type: "pkcs1",
			format: "pem",
		},
	});

	console.log(process.cwd());
	writeFileSync(
		["..", "..", "configs", "public_key.pem"].join("/"),
		keys.publicKey
	);
	writeFileSync(
		["..", "..", "configs", "private_key.pem"].join("/"),
		keys.privateKey
	);
};

generateKeys();
