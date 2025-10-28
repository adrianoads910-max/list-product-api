import { Router } from "express"
import { makeProdutController } from "../modules/products/product.controller.js"
import { ensureAuth } from "../middleware/auth.js"
import { createProductSchema, listProductsQuery, patchProductsSchema, productIdParams } from "../modules/products/products.schema.js"
import { validate } from "../middleware/validate.js"

export const productRouter = () => {
    const r = Router()
    const ctrl = makeProdutController()

    r.use(ensureAuth)

    r.post("/", validate({ body: createProductSchema }), ctrl.create)
    r.get("/", validate({ query: listProductsQuery }), ctrl.list)
    r.get("/:id", validate({ params: productIdParams }), ctrl.get)
    r.patch("/:id", validate({
        params: productIdParams,
        body: patchProductsSchema
    }), ctrl.patch)
    r.delete("/:id", validate({ params: productIdParams }), ctrl.remove)

    return r
}