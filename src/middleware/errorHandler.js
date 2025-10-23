export const errorHandler = (error, _request, response, _next) => {
    const status = error?.status ?? 500

    const payload = {
        message: error?.message ?? "Internal Server Error",
        code: error?.code ?? "INTERNAL_ERROR",
        details: error?.details ?? null
    }

    return response.status(status).json(payload)
}

