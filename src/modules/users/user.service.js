import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"
import { HttpError } from "../../utils/httpError.js"
import { env } from "../../config/env.js"
import { makeUserRepoSequelize } from "./user.repo.sequelize.js"

export const makeUserService = () => {
    const repository = makeUserRepoSequelize() //makeUserRepoMemory
    const register = async ({ name, email, password }) => {
        const exist = await repository.findByEmail({ email })

        if (exist) {
            throw new HttpError(
                "Email already in use",
                409,
                "EMAIL_TAKEN"

            )
        }
        const passwordHash = await bcrypt.hash(password, 10)
        return await repository.create({ name, email, passwordHash })

    }
    const login = async ({ email, password }) => {
        const user = await repository.findByEmail({ email })

        if (!user) {
            throw new HttpError(
                "User not found",
                404,
                "USER_NOT_FOUND"
            )
        }
        const ok = await bcrypt.compare(password, user.passwordHash)
        if (!ok) {
            throw new HttpError(
                "Invalid Credentials",
                404,
                "INVALID CREDENTIALS",
            )
        }
        const accessToken = jwt.sign({},
            env.jwtSecret,
            {
                subject:
                    String(user.id),
                expiresIn: env.jwtExpiresIn
            }
        )

        return { accessToken }
    }

    return {
        register, login
    }
}
