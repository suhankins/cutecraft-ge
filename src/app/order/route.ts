import { NextRequest } from 'next/server';
import { getValuesFromRequest } from './_utils/getValuesFromRequest';
import { validateCaptcha } from './_utils/validateCaptcha';
import { notifyListeners } from './_utils/notifyListeners';
import { getContactString } from './_utils/getContactString';
import { getCartString } from './_utils/cartStringUtils';
import { ResponseError } from './_utils/ResponseError';

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

        await notifyListeners(contactString, cartString);

        return new Response('Order request received', { status: 200 });
    } catch (error) {
        if (error instanceof ResponseError) {
            return new Response(error.message, { status: error.code });
        }
        return new Response('Unknown error has accured!', { status: 500 });
    }
}
