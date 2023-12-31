import { ItemClass } from '@/models/Item';
import { NextRequest, NextResponse } from 'next/server';
import { handleDbError } from '@/utils/server/handleDbError';
import { findCategory } from '@/utils/server/findCategory';

type pathParams = {
    params: {
        id: string;
        itemIndex: number;
        field: string;
        arrayIndex: number;
    };
};

export async function DELETE(
    _request: NextRequest,
    { params: { id, itemIndex, field, arrayIndex } }: pathParams
) {
    const key = field as keyof ItemClass;
    const category = await findCategory(id);
    if (category instanceof NextResponse) return category;
    if (category.items === undefined || category.items.length === 0)
        return new NextResponse('No items in category', { status: 400 });
    if (!(itemIndex in category.items))
        return new NextResponse('Invalid item index', { status: 400 });
    const item = category.items[itemIndex];

    switch (key) {
        case 'images': {
            if (item.images === undefined || item.images.length === 0)
                return new NextResponse('No images in item', { status: 400 });
            if (!(arrayIndex in item.images))
                return new NextResponse('Invalid image index', { status: 400 });
            item.images.splice(arrayIndex, 1);
            // TODO: Delete image from storage
            break;
        }
        default:
            return new NextResponse('Invalid field', { status: 400 });
    }

    try {
        await category.save();
    } catch (e) {
        return handleDbError(e);
    }

    return new NextResponse(
        `Item ${arrayIndex} in field ${key} successfully deleted`,
        {
            status: 200,
        }
    );
}
