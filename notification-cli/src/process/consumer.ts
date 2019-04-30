import { EventEmitter } from "events";
import { connect as MQConnect } from 'amqplib/callback_api';
import { rabbitmq } from "../../config/rabbitmq";

export class Consumer extends EventEmitter {

    connect() {
        // delay the connection for the rabbitmq service to start
        MQConnect(`amqp://${rabbitmq.host}`, (connectionError, connection) => {
            if (connectionError) {
                console.log('=================================');
                console.log('RabbitMQ Error... retrying');
                console.log('=================================');
                return setTimeout(() => { this.connect() }, 2000);
            };

            connection.createChannel((channelError, channel) => {
                if (channelError) throw channelError;

                const queue = rabbitmq.queue;

                channel.assertQueue(queue, {
                    durable: false
                });

                console.log(" [*] Waiting for messages in %s.", queue);

                channel.consume(queue, (message) => {
                    if (message) {
                        const msg = message.content.toString();
                        console.log(" [x] Received Message");
                        this.emit('message', JSON.parse(msg));
                    }
                }, { noAck: true });
            });
        });
    }
}
