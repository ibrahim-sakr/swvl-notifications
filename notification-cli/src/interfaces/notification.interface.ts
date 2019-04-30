import { Document } from 'mongoose';
import { Generic } from '../interfaces/generic.interface';

export interface NotificationInterface extends Document {
    kind: string;
    providers: string[]
    title: string;
    body: string;
    data: Generic;
    consumers: string[];
    created_at: Date;
    updated_at: Date;
}  
