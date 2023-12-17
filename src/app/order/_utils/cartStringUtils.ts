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
        throw new ResponseError('invalidCartItem', 400);

    const { categoryId, itemIndex, quantity } = simpleItem;

    if (isNaN(parseInt(`${quantity}`)))
        throw new ResponseError('invalidQuantity', 400);
    if (isNaN(parseInt(`${itemIndex}`)))
        throw new ResponseError('invalidItemIndex', 400);

    let convertedId;
    try {
        convertedId = new mongoose.Types.ObjectId(categoryId);
    } catch (e) {
        throw new ResponseError('invalidCategoryId', 400);
    }

    const category = await CategoryModel.findById(convertedId);
    if (!category) throw new ResponseError('categoryDoesntExist', 400);
    if (!category.items) throw new ResponseError('categoryIsEmpty', 400);

    const item = category.items.at(itemIndex);
    if (!item) throw new ResponseError('itemDoesntExist', 400);

    const name = getLocalizedString(item.name, defaultLocale);
    return `${quantity}x ${name} (${quantity * item.price} GEL in total)`;
}
