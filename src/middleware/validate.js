export const validate = (schemas = {}) => (request, _response, next) => {
    try {
        if (schemas.body) schemas.body.parse(request.body)

        if (schemas.query) schemas.query.parse(request.query)

        if (schemas.params) schemas.params.parse(request.params)


        return next()
    } catch (error) {
        const issues = error?.issues?.map(item => ({
            path: item.patch,
            message: item.message
        })) ?? null

        return next({
            message: "Validation error",
            status: 400,
            code: "BAD_REQUEST",
            details: issues
        })
    }
}