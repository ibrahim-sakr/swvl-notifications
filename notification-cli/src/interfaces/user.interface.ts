import { Document } from 'mongoose';

export interface UserInterface extends Document {
    name: string;
    email: string;
    token: string;
    created_at: Date;
    updated_at: Date;
}  
