export const validate = (schemas = {}) => (request, _response, next) => {
    try {
        if (schemas.body) {
            request.body = schemas.body.parse(request.body)
        }
        if (schemas.query) {
            request.query = schemas.query.parse(request.query)
        }
        if (schemas.params) {
            request.params = schemas.params.parse(request.params)
        }

        next()
    } catch (error) {
        const issues = error?.issues?.map(item => ({
            path: item.patch,
            message: item.message
        }))

        return next({
            message: "Validation error",
            status: 400,
            code: "BAD_REQUEST",
            details: issues
        })
    }
}