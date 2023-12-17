import { callApi } from '@/lib/telegramApi';
import { ListenerModel } from '@/models/Listener';
import { ResponseError } from './ResponseError';

export async function notifyListeners(
    contactString: string,
    cartString: string,
    orderId: number
) {
    const listeners = await ListenerModel.find();
    console.log('Sending message to listeners');

    for (const listener of listeners) {
        console.log('Sending message to listener', listener.telegramId);

        const result = await callApi('sendMessage', {
            chat_id: listener.telegramId,
            text: `New order #${orderId}\n\n${contactString}\n\n${cartString}`,
        }).catch((err) => {
            console.error('Error while sending message to listener', err);
            // TODO: Delete already sent messages?
            throw new ResponseError('telegramError', 500);
        });

        if (!result || !result.ok) {
            console.error('Error while sending message to listener', result);
            // TODO: Delete already sent messages?
            throw new ResponseError('telegramError', 500);
        } else {
            console.log("Message successfully sent to listener's chat");
        }
    }
    console.log('Listeners notified');
}
