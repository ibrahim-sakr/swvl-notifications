export const rabbitmq = {
    host: process.env.RABBITMQ_HOST || 'rabbitmq',
    queue: process.env.RABBITMQ_QUEUE || 'notificationQueue'
}
