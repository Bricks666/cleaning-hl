export const toBuffer = <T>(data: T): Uint8Array => {
	return Buffer.from(JSON.stringify(data));
};
