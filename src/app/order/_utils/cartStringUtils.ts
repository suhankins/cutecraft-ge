import type { SimpleCartItem } from '@/lib/Cart';
import { mongoose } from '@typegoose/typegoose';
import { ResponseError } from './ResponseError';
import { CategoryModel } from '@/models/Category';
import { getLocalizedString } from '@/lib/i18n-config';
import { defaultLocale } from '@/lib/telegramApi';

export async function getCartString(cart: SimpleCartItem[]) {
    if (!Array.isArray(cart)) throw new ResponseError('Invalid cart', 400);
    const strings = await Promise.all(cart.map(simpleItemToString));
    return strings.join('\n');
}

export async function simpleItemToString(simpleItem: SimpleCartItem) {
    if (typeof simpleItem !== 'object')
        throw new ResponseError('Invalid cart item', 400);

    const { categoryId, itemIndex, quantity } = simpleItem;

    if (isNaN(parseInt(`${quantity}`)))
        throw new ResponseError('Invalid quantity', 400);
    if (isNaN(parseInt(`${itemIndex}`)))
        throw new ResponseError('Invalid item index', 400);

    let convertedId;
    try {
        convertedId = new mongoose.Types.ObjectId(categoryId);
    } catch (e) {
        throw new ResponseError('Converted ID is invalid', 400);
    }

    const category = await CategoryModel.findById(convertedId);
    if (!category) throw new ResponseError("Category doesn't exist", 400);
    if (!category.items) throw new ResponseError('Invalid category', 400);

    const item = category.items.at(itemIndex);
    if (!item) throw new ResponseError("Item doesn't exist", 400);

    const name = getLocalizedString(item.name, defaultLocale);
    return `${quantity}x ${name} (${quantity * item.price} GEL in total)`;
}
