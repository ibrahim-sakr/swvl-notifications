import mongoose from 'mongoose';
import { database as db } from '../../config/database';

export class Database {
    async connect() {
        await mongoose.connect(`mongodb://${db.host}:${db.port}/${db.name}`, {
            useNewUrlParser: true
        });
    }

    close() {
        mongoose.connection.close();
    }
}
