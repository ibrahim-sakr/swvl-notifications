import { Database } from '../db/database'

import User from './user.model';
import { UserInterface } from '../interfaces/user.interface';

describe('User model', () => {
    let db: Database;

    beforeAll(async () => {
        db = new Database();
        await db.connect();
    });

    afterAll(async () => {
        db.close();
    });

    it('Should throw validation errors', () => {
        const user = new User();

        expect(user.validate).toThrow();
    });

    it('Should save a user', async () => {
        const user: UserInterface = new User({
            name: 'dummy name',
            email: 'dummy email',
            token: 'dummy token',
            created_at: 'dummy date',
            updated_at: 'dummy date'
        });
        const spy = jest.spyOn(user, 'save');
        user.save();

        expect(spy).toHaveBeenCalled();

        expect(user).toMatchObject({
            name: expect.any(String),
            email: expect.any(String),
            token: expect.any(String),
            created_at: expect.any(String),
            updated_at: expect.any(String)
        });

        expect(user.name).toBe('dummy name');
        expect(user.email).toBe('dummy email');
        expect(user.token).toBe('dummy token');
    });
});
