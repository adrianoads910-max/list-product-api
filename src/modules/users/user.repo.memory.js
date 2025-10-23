let users = [] // TODO: Migrar para DB

export const makeUserRepoMemory = () => {
    const create = async ({ name, email, passwordHash }) => {
        const id = users.length + 1;
        const user = { id, name, email, passwordHash }

        users.push(user)
        return user

    }
    const findbyEmail = async ({ email }) => {
        return users.find(user => user.email === email) ?? null
    }

    return { create, findbyEmail }
}