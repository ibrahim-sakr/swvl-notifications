import { NotificationInterface } from '../interfaces/notification.interface';
import { Int32 } from 'bson';

export interface ProviderInterface {
    /**
     * message per time
     */
    MPT: number;

    /**
     * time in milliseconds
     */
    TIM: number;

    /**
     * send a message to it's consumers
     * @param message NotificationInterface
     */
    send(message: NotificationInterface): void;
}
