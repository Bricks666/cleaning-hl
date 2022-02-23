export const fromBuffer = (buffer) => {
	const json = buffer.toString();

	return json && JSON.parse(json);
};
