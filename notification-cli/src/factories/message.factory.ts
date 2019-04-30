import { MessageTypeInterface } from '../interfaces/message.type.interface';
import { IndividualType } from '../types/individual.type';
import { TopicType } from '../types/topic.type';

const types: { [key: string]: MessageTypeInterface } = {
    tp: new TopicType,
    in: new IndividualType
}

export class MessageFactory {

    static get(name: string): MessageTypeInterface {
        if (!types[name.toLowerCase()]) {
            throw Error(`MessageType ${name.toLowerCase()} Not Found`);
        }

        const messageClass: MessageTypeInterface = types[name.toLowerCase()];
        return messageClass;
    }

}
