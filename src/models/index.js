import { sequelize } from "../config/database.js";
import { Product } from "./Product.js";
import { User } from "./User.js";

User.hasMany(Product, {
    foreignKey: "userId",
    as: "products"
})

Product.belongsTo(User, {
    foreignKey: "userId",
    as: "createdBy",
    onDelete: "CASCADE"
})

const models = { User, Product }

sequelize.sync({ alter: true })
    .then(() => console.log("Sync models"))
    .catch((error) => console.error("Sync error", error))


export { sequelize, User, Product }
export default models