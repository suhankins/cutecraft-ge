'use client';

import { useContext } from 'react';
import {
    CartActionContext,
    CartContentsContext,
} from '@/components/Cart/CartProvider';
import { Locale, getLocalizedString } from '@/lib/i18n-config';
import { MinusIcon, PlusIcon, TrashIcon } from '@heroicons/react/24/outline';
import { Lari } from '@/components/Lari';

export function CartViewer({
    lang,
    dictionary,
}: {
    lang: Locale;
    dictionary: {
        total: string;
    };
}) {
    const { addToCart, removeFromCart } = useContext(CartActionContext);
    const cart = useContext(CartContentsContext);

    return (
        <div className="w-full">
            <table className="w-full border-collapse">
                <tbody>
                    {cart.map((item, index) => (
                        <tr key={index} className="border-b-2">
                            <td className="w-full py-3">
                                <p className="text-lg font-bold">
                                    {getLocalizedString(item.name, lang)}
                                </p>
                            </td>
                            <td className="px-2 pb-2">
                                <button
                                    className="btn btn-circle btn-primary"
                                    onClick={() => removeFromCart(item)}
                                >
                                    {item.quantity > 1 ? (
                                        <MinusIcon className="h-6 w-6" />
                                    ) : (
                                        <TrashIcon className="h-6 w-6" />
                                    )}
                                </button>
                            </td>
                            <td>
                                <p className="w-full px-2 text-center text-3xl font-bold">
                                    {item.quantity}
                                </p>
                            </td>
                            <td className="px-2">
                                <button
                                    className="btn btn-circle btn-primary"
                                    onClick={() => addToCart(item)}
                                >
                                    <PlusIcon className="h-6 w-6" />
                                </button>
                            </td>
                            <td className="px-4">
                                <p className="text-right text-3xl font-bold">
                                    {item.price * (item.quantity ?? 1)}
                                    <Lari />
                                </p>
                            </td>
                        </tr>
                    ))}
                </tbody>
                <tfoot>
                    <tr>
                        <td />
                        <td className="w-full py-3" colSpan={3}>
                            <p className="text-right text-2xl font-bold">
                                {dictionary.total}
                            </p>
                        </td>
                        <td className="px-4">
                            <p className="text-3xl font-bold">
                                {cart.reduce(
                                    (acc, item) =>
                                        acc + item.price * item.quantity,
                                    0
                                )}
                                <Lari />
                            </p>
                        </td>
                    </tr>
                </tfoot>
            </table>
        </div>
    );
}
