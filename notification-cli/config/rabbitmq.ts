export const rabbitmq = {
    host: process.env.RABBITMQ_HOST || 'localhost',
    queue: process.env.RABBITMQ_QUEUE || 'notificationQueue'
}
