import { NextRequest, NextResponse } from 'next/server';
import { getBodyAndCategory } from '@/utils/server/getBodyAndCategory';
import { handleDbError } from '@/utils/server/handleDbError';
import { ItemClass } from '@/models/Item';
import { i18n, newLocalizedString } from '@/lib/i18n-config';

type pathParams = { params: { id: string; itemIndex: number; field: string } };

export async function PATCH(
    request: NextRequest,
    { params: { id, itemIndex, field } }: pathParams
) {
    if (field in ItemClass.fields)
        return new NextResponse('Invalid field', { status: 400 });
    const key = field as keyof ItemClass;
    const result = await getBodyAndCategory(request, id);
    if (result instanceof NextResponse) return result;
    const [body, category] = result;

    if (category.items === undefined || category.items.length === 0)
        return new NextResponse('No items in category', { status: 400 });

    const item = category.items.at(itemIndex);
    if (item === undefined)
        return new NextResponse('Invalid item index', { status: 400 });

    try {
        if (key === 'name') {
            for (const lang of i18n.locales) {
                if (body[lang]) item.name.set(lang, body[lang]);
            }
        } else if (key === 'description') {
            if (!item.description) item.description = newLocalizedString();
            for (const lang of i18n.locales) {
                if (body[lang]) item.description.set(lang, body[lang]);
            }
        } else if (key === 'price') {
            console.log(body.value, parseFloat(body.value));
            item[key] = parseFloat(body.value) || item[key];
        } else {
            return new NextResponse('Invalid field', { status: 400 });
        }

        category.save();
    } catch (e) {
        return handleDbError(e);
    }
    return new NextResponse(`Field ${key} successfully updated`, {
        status: 200,
    });
}
