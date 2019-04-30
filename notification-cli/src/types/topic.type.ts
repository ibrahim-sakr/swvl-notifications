import { MessageTypeInterface } from '../interfaces/message.type.interface';
import { NotificationInterface } from '../interfaces/notification.interface';
import { Providers } from '../providers';

/**
 *  TopicType:
 *      set the message
 *      load all push notification providers
 *      publish to them the message title, body, data and topic
 */
export class TopicType implements MessageTypeInterface {

    async send(message: NotificationInterface): Promise<any> {
        const providers = new Providers;
        providers.process(message.providers, message);
    }

}
