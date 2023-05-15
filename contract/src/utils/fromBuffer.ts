export const fromBuffer = <T>(data: Uint8Array): T => {
	return JSON.parse(data.toString()) as T;
};
