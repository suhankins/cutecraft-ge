'use client';

import { LocalizedStringObject } from '@/lib/i18n-config';
import {
    createContext,
    useCallback,
    useEffect,
    useReducer,
    useState,
} from 'react';

export interface CartItem {
    name: LocalizedStringObject;
    price: number;
    categoryId: string;
    itemIndex: number;
    quantity: number;
}

export type CartAction = {
    type: 'ADD_ITEM' | 'REMOVE_ITEM' | 'SET_CART';
    payload: CartItem | CartItem[];
};

const itemEquals = (a: CartItem, b: CartItem): boolean =>
    a.categoryId === b.categoryId && a.itemIndex === b.itemIndex;

const findItem = (cart: CartItem[], item: CartItem) =>
    cart.find((currentItem) => itemEquals(currentItem, item));

const getCartWithoutItem = (cart: CartItem[], item: CartItem) =>
    cart.filter((currentItem) => !itemEquals(currentItem, item));

function cartReducer(state: CartItem[], action: CartAction): CartItem[] {
    const payload = action.payload;
    switch (action.type) {
        case 'ADD_ITEM': {
            if (Array.isArray(payload)) return state;
            const foundItem = findItem(state, payload);
            // Item not found in cart, adding new item
            if (!foundItem) return [...state, { ...payload }];
            // Item found in cart, increasing quantity
            return [
                ...getCartWithoutItem(state, foundItem),
                {
                    ...foundItem,
                    quantity: foundItem.quantity + 1,
                },
            ];
        }
        case 'REMOVE_ITEM': {
            if (Array.isArray(payload)) return state;
            const foundItem = findItem(state, payload);
            // Item not found in cart, doing nothing
            if (!foundItem) return state;
            // Item found in cart and has quantity > 1, decreasing quantity
            if (foundItem.quantity > 1)
                return [
                    ...getCartWithoutItem(state, foundItem),
                    {
                        ...foundItem,
                        quantity: foundItem.quantity - 1,
                    },
                ];

            // Item found in cart and quantity is too low, removing item'
            return getCartWithoutItem(state, foundItem);
        }
        case 'SET_CART': {
            if (Array.isArray(payload)) return [...payload];
            return [{ ...payload }];
        }
        default:
            return state;
    }
}

export const CartActionContext = createContext({
    addToCart: (item: CartItem) => {},
    removeFromCart: (item: CartItem) => {},
    clearCart: () => {},
});

export const CartContentsContext = createContext<CartItem[]>([]);

export function CartProvider({ children }: { children: React.ReactNode }) {
    const [cartItems, dispatch] = useReducer(cartReducer, []);
    const [cartLoaded, setCartLoaded] = useState(false);

    useEffect(() => {
        console.log('Items updated!', cartItems);
        if (cartLoaded)
            sessionStorage.setItem('cart', JSON.stringify(cartItems));
    }, [cartItems, cartLoaded, cartItems.length]);

    useEffect(() => {
        if (cartItems.length > 0) return;
        const cart = sessionStorage.getItem('cart');
        if (cart) {
            try {
                const parsedCart = JSON.parse(cart) as CartItem[];
                if (Array.isArray(parsedCart) && parsedCart.length > 0) {
                    console.log('Cart found in session storage, setting cart');
                    dispatch({ type: 'SET_CART', payload: parsedCart });
                }
            } catch (e) {
                console.log(
                    "Couldn't parse data from session storage, skipping"
                );
            }
        }
        setCartLoaded(true);
    }, [cartItems.length]);

    const addToCart = useCallback(
        (item: CartItem) => {
            dispatch({ type: 'ADD_ITEM', payload: item });
        },
        [dispatch]
    );

    const removeFromCart = useCallback(
        (item: CartItem) => {
            dispatch({ type: 'REMOVE_ITEM', payload: item });
        },
        [dispatch]
    );

    const clearCart = useCallback(() => {
        dispatch({ type: 'SET_CART', payload: [] });
    }, [dispatch]);

    return (
        <CartContentsContext.Provider value={cartItems}>
            <CartActionContext.Provider
                value={{ addToCart, removeFromCart, clearCart }}
            >
                {children}
            </CartActionContext.Provider>
        </CartContentsContext.Provider>
    );
}
