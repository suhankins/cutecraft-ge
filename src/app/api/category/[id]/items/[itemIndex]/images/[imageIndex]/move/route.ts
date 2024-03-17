import { findCategory } from '@/utils/server/findCategory';
import { handleDbError } from '@/utils/server/handleDbError';
import { NextRequest, NextResponse } from 'next/server';

export async function PATCH(
    request: NextRequest,
    {
        params: { id, itemIndex, imageIndex },
    }: {
        params: {
            id: string;
            itemIndex: string;
            imageIndex: string;
        };
    }
) {
    const parsedImageIndex = parseInt(imageIndex);
    if (isNaN(parsedImageIndex)) {
        return new NextResponse('Invalid image index', { status: 400 });
    }
    const direction = request.nextUrl.searchParams.get('direction');
    if (direction !== 'left' && direction !== 'right') {
        return new NextResponse('Invalid direction', { status: 400 });
    }
    const category = await findCategory(id);
    if (category instanceof NextResponse) {
        return category;
    }
    if (category.items === undefined || category.items.length === 0) {
        return new NextResponse('No items in category', { status: 400 });
    }
    const parsedItemIndex = parseInt(itemIndex);
    if (isNaN(parsedItemIndex)) {
        return new NextResponse('Invalid item index', { status: 400 });
    }
    const item = category.items[parsedItemIndex];
    if (item === undefined) {
        return new NextResponse('Invalid item index', { status: 400 });
    }
    if (item.images.length < 2) {
        return new NextResponse(`Item doesn't have enough images`, {
            status: 400,
        });
    }
    if (parsedImageIndex < 0 || parsedImageIndex > item.images.length - 1) {
        return new NextResponse('Image index out of range', { status: 400 });
    }
    if (direction === 'left' && parsedImageIndex === 0) {
        return new NextResponse('Image is already first', {
            status: 400,
        });
    }
    if (direction === 'right' && parsedImageIndex === item.images.length - 1) {
        return new NextResponse('Image already at the end', {
            status: 400,
        });
    }

    const change = direction === 'left' ? -1 : 1;
    try {
        let otherImages = item.images.splice(parsedImageIndex, 1)[0];
        item.images.splice(parsedImageIndex + change, 0, otherImages);
        await category.save();
    } catch (e) {
        return handleDbError(e);
    }

    return new NextResponse('Image successfully moved', { status: 200 });
}
