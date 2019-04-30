import { NotificationInterface } from '../interfaces/notification.interface';

export interface MessageTypeInterface {

    send(message: NotificationInterface): Promise<any>;

}
