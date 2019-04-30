/**
 *  # get the message id from RabbitMQ
 *  select it from DB
 *  based on type create a new MessageTypeClass and pass the message
 */
import Notification from '../models/notification.model';
import { MessageInterface } from '../interfaces/message.interface';
import { MessageTypeInterface } from '../interfaces/message.type.interface';
import { MessageFactory } from '../factories/message.factory';

const sendNotification = (notification: any) => {
    const messageClass: MessageTypeInterface = MessageFactory.get(notification.kind);
    messageClass.send(notification);
};

export const Processor = (message: MessageInterface) => {
    Notification.findOne({ _id: message.id }, (err: any, notification: any) => {
        if (err) throw new Error('no notifications found');
        sendNotification(notification.toObject());
    });
};
