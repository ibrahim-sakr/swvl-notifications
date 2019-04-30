import { ProviderInterface } from '../interfaces/provider.interface';
import { NotificationInterface } from '../interfaces/notification.interface';
import { SmsProvider } from './sms.provider';
import { FcmProvider } from './fcm.provider';
import { ApnProvider } from './apn.provider';
import { EmailProvider } from './email.provider';
import Notification from '../models/notification.model';

/**
 *  notification providers: implements ProviderInterface
 *      SMS
 *      Firebase
 *      APNs
 */
const providerRegistration: { [key: string]: ProviderInterface } = {
    'sms': new SmsProvider,
    'fcm': new FcmProvider,
    'apn': new ApnProvider,
    'eml': new EmailProvider
}

export class Providers {

    process(prviders: Array<string>, message: NotificationInterface): void {
        if (prviders.length > 0) {
            // head and tail of the prviders
            const [head, ...tail] = prviders;

            // get it's provider
            const provider = providerRegistration[head];

            // process provider
            if (provider) {
                // make a copy of the message to the provider
                const providerMessage = JSON.parse(JSON.stringify(message));
                provider.send(providerMessage);
            }

            // start recursive
            this.process(tail, message);
        }
    }

}
