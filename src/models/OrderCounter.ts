import { getModelForClass, mongoose, prop } from '@typegoose/typegoose';
import type { ReturnModelType } from '@typegoose/typegoose';
if (process.env.NODE_ENV !== 'test') import('@/lib/mongodb'); // Importing library to connect to MongoDB

export class OrderCountClass {
    @prop({ default: 0 })
    count!: number;
}

export const OrderCountModel =
    (mongoose.models.OrderCountClass as ReturnModelType<
        typeof OrderCountClass,
        {}
    >) || getModelForClass(OrderCountClass);

export async function getNextOrderId() {
    await OrderCountModel.updateOne(
        {},
        { $inc: { count: 1 } },
        { upsert: true }
    );
    return (await OrderCountModel.findOne())?.count;
}
