import { getModelForClass, prop, mongoose } from '@typegoose/typegoose';
import type { ReturnModelType } from '@typegoose/typegoose';
if (process.env.NODE_ENV !== 'test') import('@/lib/mongodb'); // Importing library to connect to MongoDB

/**
 * Listener is a Telegram user who is subscribed to order notifications
 */
export class ListenerClass {
    @prop({ required: true, unique: true })
    public telegramId!: string;
}

export const ListenerModel =
    (mongoose.models.ListenerClass as ReturnModelType<
        typeof ListenerClass,
        {}
    >) || getModelForClass(ListenerClass);
