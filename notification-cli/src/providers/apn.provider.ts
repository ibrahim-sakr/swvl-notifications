import { ProviderInterface } from '../interfaces/provider.interface';
import { NotificationInterface } from '../interfaces/notification.interface';
import { toChunks } from '../utils/chunks';
import { log } from '../utils/log';

export class ApnProvider implements ProviderInterface {
    MPT = 100; // 100 message per TIM
    TIM = 60 * 1000; // 1 min in milliseconds

    /**
     * store the setInterval id
     */
    timer: any;

    /**
     * start sending the message
     * @param message 
     */
    send(message: NotificationInterface): void {
        // chunk message.consumers
        const consumerChunks = toChunks(message.consumers, this.MPT);

        // send first chunk
        this.sendChunk(message, consumerChunks);

        // every TIM
        this.timer = setInterval(this.sendChunk, this.TIM, message, consumerChunks);
    }

    /**
     * send one chunk
     * @param message 
     * @param chunks 
     */
    private sendChunk(message: NotificationInterface, chunks: Array<string[]>) {
        const consumerChunk = chunks.shift();
        if (consumerChunk) {
            message.consumers = consumerChunk;
            this.processMessage(message);
        } else {
            // chunks is empty so we just clear the timer and we are done
            clearInterval(this.timer);
        }
    }

    /**
     * use the provider SDK to send the message
     * @param message
     */
    private processMessage(message: NotificationInterface) {
        // send one chunk
        log.info(() => "APNs Notification: " + JSON.stringify(message));
    }

}
