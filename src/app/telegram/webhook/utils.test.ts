import { handleListener, handleNotListener } from './utils';
import { DocumentType } from '@typegoose/typegoose';
import { ListenerClass, ListenerModel } from '@/models/Listener';
import { mock } from 'vitest-mock-extended';
import { TelegramMessage, callApi } from '@/lib/telegramApi';
import { MockedFunction } from 'vitest';

vi.mock('@typegoose/typegoose', async () => ({
    ...((await vi.importActual('@typegoose/typegoose')) as Object),
    getModelForClass: vi.fn(),
}));

vi.mock('@/lib/telegramApi', () => ({
    callApi: vi.fn(),
}));

vi.mock('@/models/Listener', async () => ({
    ...((await vi.importActual('@/models/Listener')) as Object),
    ListenerModel: {
        create: () => {},
    },
}));

describe('telegram/webhook/utils', () => {
    const message: TelegramMessage = {
        chat: {
            id: 123,
            type: 'private' as const,
        },
    };

    describe('handleListener', () => {
        const listener = mock<DocumentType<ListenerClass>>({
            telegramId: '123',
            deleteOne: vi.fn(),
        });

        it("should not call delete or callApi if message doesn't contain text", async () => {
            message.text = undefined;
            await handleListener(message, listener);

            expect(callApi).not.toHaveBeenCalled();
            expect(listener.deleteOne).not.toHaveBeenCalled();
        });
        it('should delete listener and send a message if message is unsubscribe', async () => {
            message.text = 'unsubscribe';
            await handleListener(message, listener);

            expect(listener.deleteOne).toHaveBeenCalled();
            expect(callApi).toHaveBeenCalledWith('sendMessage', {
                chat_id: message.chat.id,
                text: 'You have been unsubscribed',
            });
        });
        it('should delete listener and send a message if message is "uNsUbScRiBe ", ignoring case and whitespace', async () => {
            message.text = 'uNsUbScRiBe ';
            await handleListener(message, listener);

            expect(listener.deleteOne).toHaveBeenCalled();
            expect(callApi).toHaveBeenCalledWith('sendMessage', {
                chat_id: message.chat.id,
                text: 'You have been unsubscribed',
            });
        });
        it('should not throw an error if message is unsubscribe and delete failed', async () => {
            message.text = 'unsubscribe';
            listener.deleteOne.mockImplementationOnce(() => {
                throw new Error('Test error');
            });

            expect(
                async () => await handleListener(message, listener)
            ).not.toThrow();
            expect(callApi).toHaveBeenCalledWith('sendMessage', {
                chat_id: message.chat.id,
                text: 'Error unsubscribing: Error: Test error',
            });
        });
        it('should not throw an error if message is unsubscribe and delete failed and callApi failed', async () => {
            message.text = 'unsubscribe';
            listener.deleteOne.mockImplementationOnce(() => {
                throw new Error('Test error');
            });
            (callApi as MockedFunction<typeof callApi>).mockImplementation(
                () => {
                    throw new Error('Test error');
                }
            );

            expect(
                async () => await handleListener(message, listener)
            ).not.toThrow();
            expect(callApi).toHaveBeenCalledWith('sendMessage', {
                chat_id: message.chat.id,
                text: 'Error unsubscribing: Error: Test error',
            });
        });
        it('should send a message if message is not unsubscribe', async () => {
            message.text = 'not unsubscribe';
            await handleListener(message, listener);

            expect(listener.deleteOne).not.toHaveBeenCalled();
            expect(callApi).toHaveBeenCalledWith('sendMessage', {
                chat_id: message.chat.id,
                text: 'You are already subscribed',
            });
        });
        it('should not throw an error if message is not unsubscribe and callApi failed', async () => {
            message.text = 'not unsubscribe';
            (callApi as MockedFunction<typeof callApi>).mockImplementationOnce(
                () => {
                    throw new Error('Test error');
                }
            );

            expect(
                async () => await handleListener(message, listener)
            ).not.toThrow();
            expect(callApi).toHaveBeenCalledWith('sendMessage', {
                chat_id: message.chat.id,
                text: 'You are already subscribed',
            });
        });
    });

    describe('handleNotListener', () => {
        process.env.TELEGRAM_PASSWORD = 'correct_password';
        const createSpy = vi.spyOn(ListenerModel, 'create');

        it('should send a message if message is not correct password', async () => {
            message.text = 'wrong password';
            await handleNotListener(message);

            expect(callApi).toHaveBeenCalledWith('sendMessage', {
                chat_id: message.chat.id,
                text: 'Wrong password',
            });
        });
        it('should not throw an error if message is not correct password and callApi failed', async () => {
            message.text = 'wrong password';
            (callApi as MockedFunction<typeof callApi>).mockImplementationOnce(
                () => {
                    throw new Error('Test error');
                }
            );

            expect(async () => await handleNotListener(message)).not.toThrow();
            expect(callApi).toHaveBeenCalledWith('sendMessage', {
                chat_id: message.chat.id,
                text: 'Wrong password',
            });
        });
        it('should send a message and create a listener if message is correct password', async () => {
            message.text = process.env.TELEGRAM_PASSWORD;
            await handleNotListener(message);

            expect(callApi).toHaveBeenCalled();
            expect(createSpy).toHaveBeenCalledWith({
                telegramId: message.chat.id,
            });
        });
        it('should not throw an error if message is correct password and callApi failed', async () => {
            message.text = process.env.TELEGRAM_PASSWORD;
            (callApi as MockedFunction<typeof callApi>).mockImplementationOnce(
                () => {
                    throw new Error('Test error');
                }
            );

            expect(async () => await handleNotListener(message)).not.toThrow();
            expect(createSpy).toHaveBeenCalledWith({
                telegramId: message.chat.id,
            });
        });
        it('should not throw an error if message is correct password and create failed', async () => {
            message.text = process.env.TELEGRAM_PASSWORD;
            createSpy.mockImplementation(() => {
                throw new Error('Test error');
            });

            expect(async () => await handleNotListener(message)).not.toThrow();
            expect(createSpy).toHaveBeenCalledWith({
                telegramId: message.chat.id,
            });
            expect(callApi).toHaveBeenCalledWith('sendMessage', {
                chat_id: message.chat.id,
                text: 'Error subscribing: Error: Test error',
            });
        });
        it('should not throw an error if message is correct password and create failed and callApi failed', async () => {
            message.text = process.env.TELEGRAM_PASSWORD;
            createSpy.mockImplementationOnce(() => {
                throw new Error('Test error');
            });
            (callApi as MockedFunction<typeof callApi>).mockImplementation(
                () => {
                    throw new Error('Test error');
                }
            );

            expect(async () => await handleNotListener(message)).not.toThrow();
            expect(createSpy).toHaveBeenCalledWith({
                telegramId: message.chat.id,
            });
            expect(callApi).toHaveBeenCalledWith('sendMessage', {
                chat_id: message.chat.id,
                text: 'Error subscribing: Error: Test error',
            });
        });
    });
});
