import type { NextRequest } from 'next/server';
import { getValuesFromRequest } from './_utils/getValuesFromRequest';
import { validateCaptcha } from './_utils/validateCaptcha';
import { notifyListeners } from './_utils/notifyListeners';
import { getContactString } from './_utils/getContactString';
import { getCartString } from './_utils/cartStringUtils';
import { ResponseError } from './_utils/ResponseError';
import { getNextOrderId } from '@/models/OrderCounter';

/**
 * Order request handler.
 */
export async function POST(request: NextRequest) {
    try {
        const { contactInfo, cart, recaptcha } = await getValuesFromRequest(
            request
        );
        await validateCaptcha(recaptcha);

        const contactString = getContactString(contactInfo);
        const cartString = await getCartString(cart);
        const orderId = (await getNextOrderId()) ?? 0;

        await notifyListeners(contactString, cartString, orderId);

        return new Response(`${orderId}`, { status: 200 });
    } catch (error) {
        if (error instanceof ResponseError) {
            return new Response(error.message, { status: error.code });
        }
        console.error(error);
        return new Response('Unknown error has accured!', { status: 500 });
    }
}
