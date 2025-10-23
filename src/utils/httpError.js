export class HttpError extends Error {
    constructor(
        message = "Unexpected Error",
        status = 500,
        code = "INTERNAL_ERROR",
        details = null
    ) {
        super(message);
        this.status = status
        this.code = code
        this.details = details
    }
}
