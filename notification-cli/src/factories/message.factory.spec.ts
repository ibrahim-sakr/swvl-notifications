import { MessageFactory } from './message.factory';
import { TopicType } from '../types/topic.type';
import { IndividualType } from '../types/individual.type';

describe('Message Factory', () => {
    const call = (name: any) => {
        return () => {
            return MessageFactory.get(name)
        }
    }

    it('Should throw MessageType not found error', () => {
        expect(call('dummy')).toThrowError(Error);
        expect(call('dummy')).toThrowError(/Not Found/);
    });
    it('Should get the MessageType', () => {
        expect(call('TP')()).toBeInstanceOf(TopicType)
        expect(call('IN')()).toBeInstanceOf(IndividualType)
    });
});
