import { Database } from '../db/database'

import Notification from './notification.model';
import { NotificationInterface } from '../interfaces/notification.interface';

describe('Notification model', () => {
    let db: Database;

    beforeAll(async () => {
        db = new Database();
        await db.connect();
    });

    afterAll(async () => {
        db.close();
    });

    it('Should throw validation errors', () => {
        const notification = new Notification();

        expect(notification.validate).toThrow();
    });

    it('Should save a notification', async () => {
        const notification: NotificationInterface = new Notification({
            kind: 'TP',
            providers: ['sms', 'fcm'],
            title: 'dummy title',
            body: 'dummy body',
            data: { key: 'value' },
            consumers: ['topic_name'],
            created_at: 'dummy date',
            updated_at: 'dummy date'
        });
        const spy = jest.spyOn(notification, 'save');
        notification.save();

        expect(spy).toHaveBeenCalled();

        expect(notification).toMatchObject({
            kind: expect.any(String),
            providers: expect.any(Array),
            title: expect.any(String),
            body: expect.any(String),
            data: expect.any(Object),
            consumers: expect.any(Array),
            created_at: expect.any(String),
            updated_at: expect.any(String)
        });

        expect(notification.kind).toBe('TP');
        expect(notification.providers).toEqual(expect.arrayContaining(['sms', 'fcm']));
        expect(notification.title).toBe('dummy title');
        expect(notification.body).toBe('dummy body');
    });
});
