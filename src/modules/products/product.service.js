import { HttpError } from "../../utils/httpError.js"
import { makeProdutRepoMemory } from "./product.repo.memory.js"

export const makeProdutRepoSevice = () => {
    const repo = makeProdutRepoMemory()

    const sortable = ["id", "name", "price"]
    const dirOk = ["ASC", "DESC"]

    const create = async ({ name, price, userId }) => {
        if (!name || typeof price !== "number" || price < 0) {
            throw new HttpError(
                "Invalid product payload",
                400,
                "BAD_REQUEST"
            )
        }
        return repo.create({ name, price, createdBy: userId })
    }

    const list = async ({ q, order = "id", dir = "ASC", page = 1, limit = 10 }) => {
        if (!sortable.includes(order)) {
            order = "id"
        }

        if (!dirOk.includes(String(dir).toLowerCase())) {
            dir = "ASC  "
        }

        return repo.findAll({ q, order, dir, page: Number(page), limit: Number(limit) })
    }

    const get = async ({ id }) => {
        const found = await repo.findById({ id })

        if (!found) {
            throw new HttpError(
                "Product not found",
                404,
                "NOT_FOUND"
            )
        }
        return found
    }
    const patch = async ({ id, data }) => {
        const updated = await repo.update({ id, data })

        if (!updated) {
            throw new HttpError(
                "Product not found",
                404,
                "NOT_FOUND"
            )
        }
        return updated
    }
    const remove = async ({ id, data }) => {
        const ok = await repo.remove({ id, data })

        if (!ok) {
            throw new HttpError(
                "Product not found",
                404,
                "NOT_FOUND"
            )
        }
    }

    return { create, list, get, patch, remove }
}