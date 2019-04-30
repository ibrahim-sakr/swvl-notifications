
export const database = {
    host: process.env.DB_HOST || 'mongo',
    port: process.env.DB_PORT || 27017,
    name: process.env.DB_NAME || 'swvl_notifications',
}
