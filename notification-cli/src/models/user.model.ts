import mongoose, { Schema } from 'mongoose';
import { UserInterface } from '../interfaces/user.interface';

const UserSchema: Schema = new Schema({
    name: { type: String, required: true },
    email: { type: String, required: true },
    token: { type: String, required: true },
    created_at: { type: String, required: true },
    updated_at: { type: String, required: true }
});

export default mongoose.model<UserInterface>('User', UserSchema, 'users');
