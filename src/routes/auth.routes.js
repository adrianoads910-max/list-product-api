import { Router } from "express"
import { makeUserController } from "../modules/users/user.controller.js"
import { loginSchema, registerSchema } from "../modules/users/user.schema.js"
import { validate } from "../middleware/validate.js"

export const authRouter = () => {
    const router = Router()
    const ctrl = makeUserController()

    router.post("/register", validate({ body: registerSchema }), ctrl.register)
    router.post("/login", validate({ body: loginSchema }), ctrl.login)
    router.get("/me", ctrl.me)
    return router
}