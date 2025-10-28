import { Router } from "express"
import { makeProdutController } from "../modules/products/product.controller"
import { ensureAuth } from "../middleware/auth"

export const productRouter = () => {
    const r = Router()
    const ctrl = makeProdutController()

    r.use(ensureAuth)
}