import { Op } from "sequelize"
import { Product, User } from "../../models"

export const makeProdutRepoSequelize = () => {
    const create = async ({ name, price, createdBy }) => {
        const product = await Product.create({
            name,
            price,
            userId: createdBy
        })
        return product.toJSON()
    }

    const findAll = async ({ q, order, dir, page, limit }) => {
        const where = {}

        if (q) {

            where.name = { [Op.like]: `%${q}` }
        }
        const offset = (page - 1) * limit

        const { count, rows } = await Product.findAndCountAll({
            where,
            include: [{
                model: User,
                as: "createdBy",
                attributes: ["id", "name"]
            }],
            limit,
            offset,
            order: [[order, dir]]
        })

        return {
            items: rows.map(p => p.toJSON()),
            page,
            limit,
            total: count
        }
    }

    const findById = async ({ id }) => {
        const product = await Product.findByPk(id, {
            include: [{
                model: User,
                as: "createdBy",
                attributes: ["id", "name"]
            }]
        })

        return product ? product.toJSON() : null
    }

    const update = async ({ id, data }) => {
        const product = await Product.findByPk(id)

        if (!product) return null

        await product.update(data)
    }

    const remove = async ({ id }) => {
        const product = await Product.findByPk(id)

        if (!product) return null

        await product.destroy()

        return true
    }

    return { create, findAll, findById, update, remove }
}