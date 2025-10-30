import { createApp } from "./app.js";
import { sequelize } from "./config/database.js";
import { env } from "./config/env.js";

const bootstrap = async () => {
    const app = createApp()

    sequelize.authenticate()
        .then(() => console.log("Database connected"))
        .catch((error) => console.error("Database error", error))

    app.listen(env.port,
        () => console.log(`HTTP on: ${env.port}`)
    )
}
await bootstrap()