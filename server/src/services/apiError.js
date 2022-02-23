export class ApiError extends Error {
	constructor(status, message) {
		super(message);
		this.status = status;
	}
	static BadRequest(message) {
		return new ApiError(400, message);
	}
	static NoAuthorization() {
		return new ApiError(401, "No authorization");
	}
	static NoAccess() {
		return new ApiError(403, "No access");
	}
}
