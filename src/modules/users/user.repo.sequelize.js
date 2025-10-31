import { User } from "../../models"

export const makeUserRepoSequelize = () => {
    const create = async ({ name, email, passwordHash }) => {
        const user = await User.create({ name, email, passwordHash })

        return user.toJSON()
    }

    const findByEmail = async ({ email }) => {
        const user = await User.findOne({ where: { email } })

        return user ? user.toJSON() : null
    }

    const findById = async ({ id }) => {
        const user = await User.findByPk(id, {
            attributes: {
                exclude: ["passwordHash"]
            }
        })

        return user ? user.toJSON() : null
    }

    return { create, findByEmail, findById }

}