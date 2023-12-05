import type { NextRequest } from 'next/server';
import { ResponseError } from './ResponseError';
import { getFormControls } from '@/lib/FormControls';
import { getDictionary } from '@/lib/getDictionary';
import { defaultLocale } from '@/lib/telegramApi';

export async function getValuesFromRequest(request: NextRequest) {
    const formData = await request.formData();

    const recaptcha = formData.get('g-recaptcha-response');
    if (recaptcha === null || typeof recaptcha !== 'string')
        throw new ResponseError('ReCaptcha response is missing', 400);

    const rawCart: FormDataEntryValue | null = formData.get('cart');
    if (rawCart === null || typeof rawCart !== 'string')
        throw new ResponseError('Cart is missing', 400);

    let cart;
    try {
        cart = JSON.parse(rawCart);
    } catch (e) {
        throw new ResponseError('Cart is invalid', 400);
    }

    if (!Array.isArray(cart)) throw new ResponseError('Cart is invalid', 400);

    const dictionary = await getDictionary(defaultLocale);

    const contactInfo = getFormControls(dictionary.orderForm).map((value) => ({
        label: value.label,
        content: formData.get(value.id),
    }));

    if (
        contactInfo.some(
            ({ content }) => content === null || typeof content !== 'string'
        )
    )
        throw new ResponseError('Contact form fields are missings', 400);

    return {
        cart,
        contactInfo,
        recaptcha,
    };
}
