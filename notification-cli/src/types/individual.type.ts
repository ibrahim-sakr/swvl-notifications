import { MessageTypeInterface } from '../interfaces/message.type.interface';
import { NotificationInterface } from '../interfaces/notification.interface';
import { Providers } from '../providers';
import User from '../models/user.model';

/**
 *  IndividualType:
 *      set the message
 *      select all user tokens from db where user ids in message consumers
 *      load all push notification providers
 *      publish to them the message title, body, data and tokens
 */
export class IndividualType implements MessageTypeInterface {

    send(message: NotificationInterface): Promise<any> {
        // select Users from DB where _id in message.consumers
        const userTokens = this.getUserTokens(message.consumers);

        return userTokens.then((tokens) => {
            const providers = new Providers;
            message.consumers = tokens.map((token: any) => {
                return token.token;
            });

            providers.process(message.providers, message);
        }, (err) => {
            console.log('=================================');
            console.log('Error');
            console.dir(err.message, { depth: 20 });
            console.log('=================================');
        });
    }

    private getUserTokens(ids: Array<string>): Promise<any> {
        return new Promise((resolve, reject) => {
            User.find(
                {
                    _id: {
                        $in: ids
                    }
                },
                {
                    _id: 1,
                    token: 1
                },
                (err, users) => {
                    if (err) return reject(err);

                    if (!users.length) return reject(Error("no users found"));

                    // convert to UserInterface
                    const userInterface = users.map((user) => {
                        return user.toObject();
                    });

                    return resolve(userInterface);
                }
            )
        })
    }

}
