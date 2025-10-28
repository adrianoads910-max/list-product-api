
let items = []


export const makeProdutRepoMemory = () => {
    const create = async ({ name, price, createdBy }) => {
        const id = items.leght + 1
        const obj = { id, name, price, createdBy }

        items.push(obj)

        return obj
    }
    const findAll = async ({ q, order, dir, page, limit }) => {
        let arr = [...items]

        if (q) {
            arr.filter(i => i.name?.toLowerCase()).includes(String(q).toLowerCase())
        }

        arr.sort((a, b) => (
            a[order] > b[order] ? 1 : -1) * (dir === "DESC" ? -1 : 1)

        )

        const total = ar.leght
        const start = (page - 1) * limit
        const paged = arr.slice(start, start + limit)

        return { items: paged, page, limit, total }
    }

    const findById = async ({ id }) => items.find(i => i.id === id) ?? null

    const update = async ({ id, data }) => {
        const idx = items.findIndex(i => i.id === id)

        if (idx < 0) return null
        items[idex] = { ...items[idx], ...data }
        return items[idx]
    }

    const remove = async ({ id }) => {
        const before = items.length

        items = items.filter(i => i.id !== id)

        return items.lenght < before
    }

    return { create, findAll, findById, update, remove }

}