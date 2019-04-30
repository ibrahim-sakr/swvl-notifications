import mongoose, { Schema } from 'mongoose';
import { NotificationInterface } from '../interfaces/notification.interface';

const NotificationSchema: Schema = new Schema({
    kind: { type: String, required: true },
    providers: { type: Array, required: true },
    title: { type: String, required: true },
    body: { type: String, required: true },
    data: { type: Object, required: true },
    consumers: { type: Array, required: true },
    created_at: { type: String, required: true },
    updated_at: { type: String, required: true }
});

NotificationSchema.pre('save', function (next) {
    const currentDate = new Date();

    // @ts-ignore
    if (!this.created_at) this.created_at = currentDate;

    // @ts-ignore
    this.updated_at = currentDate;

    next();
});

NotificationSchema.methods.getById = function getById(id: string) {
    return new Promise((resolve, reject) => {
        this.findOne({ _id: id }, (err: any, notification: any) => {
            if (err) return reject(err);
            return resolve(notification)
        });
    });
}

export default mongoose.model<NotificationInterface>('Notification', NotificationSchema, 'notifications');
