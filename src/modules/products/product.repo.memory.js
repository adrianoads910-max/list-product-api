let items = []


export const makeProdutRepoMemory = () => {
    const creat = async ({ name, price, createBy }) => {
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
}