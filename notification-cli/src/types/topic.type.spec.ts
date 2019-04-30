import { TopicType } from './topic.type';

describe('Type Topic', () => {
    const message: any = {
        kind: 'TP',
        providers: ['sms', 'fcm'],
        title: 'title',
        body: 'body',
        data: { key: 'value' },
        consumers: ['topic'],
        created_at: new Date,
        updated_at: new Date
    };

    const type = new TopicType;

    it('Should send a message of type Topic', () => {
        // return expect(type.send(message)).toEqual({});
        return expect(type.send(message)).resolves.toBeUndefined();
    });
});
