import type { LocalizedStringObject } from '@/lib/i18n-config';

export interface CartItem {
    name: LocalizedStringObject;
    price: number;
    categoryId: string;
    itemIndex: number;
    quantity: number;
}

export type SimpleCartItem = ReturnType<typeof simplifyCartItem>;

export function simplifyCartItem(item: CartItem) {
    return {
        categoryId: item.categoryId,
        itemIndex: item.itemIndex,
        quantity: item.quantity,
    };
}
