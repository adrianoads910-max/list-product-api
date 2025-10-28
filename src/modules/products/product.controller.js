import { request, response } from "express"
import { makeProdutRepoSevice } from "./prodcut.service"

export const makeProdutController = () => {
    const service = makeProdutRepoSevice()

    const create = async (request, response, next) => {
        try {
            const { name, price } = request.body

            const prodcut = await service.create({
                name,
                price,
                userId: request.user.id
            })
            return response.status(201).json(prodcut)
        }
        catch (error) {
            next(error)

        }


    }

    const list = async (request, response, next) => {
        try {
            return response.json(
                await service.list(request.query)
            )
        }
        catch (error) {
            next(error)

        }
    }
    const get = async (request, response, next) => {
        try {
            return response.json(
                await service.get({
                    id: Number(request.params.id)
                })
            )
        }
        catch (error) {
            next(error)


        }
    }
    const patch = async (request, response, next) => {
        try {
            return response.json(
                await service.patch({
                    id: Number(request.params.id),
                    data: request.body
                })
            )
        }
        catch (error) {
            next(error)

        }
    }
    const remove = async (request, response, next) => {
        try {

            await service.remove({
                id: Number(request.params.id)
            })

            return response.status(204).send()
        }
        catch (error) {
            next(error)

        }
    }

    return { create, list, get, patch, remove }
}