import { SmsProvider } from './sms.provider';

describe('SMS Provider', () => {
    let provider: any;

    beforeAll(async () => {
        provider = new SmsProvider;
    });

    it('Should send a message', () => {

        const spySendChunk = jest.spyOn(provider, 'sendChunk');
        const spyProcessMessage = jest.spyOn(provider, 'processMessage');

        provider.send({
            consumers: ['1', '2', '3']
        });

        expect(spySendChunk).toHaveBeenCalled();
        expect(spyProcessMessage).toHaveBeenCalled();
    });
});
