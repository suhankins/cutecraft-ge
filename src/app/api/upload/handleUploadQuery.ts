import 'server-only';
import { NextRequest, NextResponse } from 'next/server';
import { allowedImageTypes } from '../../../lib/allowedImageTypes';
import { mongoose } from '@typegoose/typegoose';
import { CategoryClass, CategoryModel } from '@/models/Category';

export interface HandledUploadQuery {
    filetype?: string;
    filename?: string;
    id: mongoose.Types.ObjectId;
    itemIndex?: number;
    imageIndex?: number;
    model: mongoose.Document & CategoryClass;
}

/**
 * Handles the query parameters for the upload and confirmUpload routes
 * @returns
 * If the query parameters are invalid, returns a NextResponse with the error message.
 * Otherwise, returns an object with the filetype, id, itemIndex, and model.
 */
export async function handleUploadQuery(
    request: NextRequest
): Promise<NextResponse | HandledUploadQuery> {
    const query = request.nextUrl.searchParams;

    const filetype = query.get('filetype') ?? undefined;
    if (filetype !== undefined && !allowedImageTypes.includes(filetype))
        return new NextResponse('Invalid filetype provided', { status: 400 });

    const filename = query.get('filename') ?? undefined;

    let id: null | string | mongoose.Types.ObjectId = query.get('id');
    if (id === null || id.length === 0)
        return new NextResponse('No category id provided', { status: 400 });
    try {
        id = new mongoose.Types.ObjectId(id);
    } catch (e) {
        return new NextResponse('Invalid category id provided', {
            status: 400,
        });
    }

    const model = await CategoryModel.findById(id);
    if (model === null || model === undefined)
        return new NextResponse('Category does not exist', { status: 400 });

    let itemIndex: string | undefined | number =
        query.get('itemIndex') ?? undefined;
    if (itemIndex !== undefined) {
        itemIndex = parseInt(itemIndex);
        if (
            isNaN(itemIndex) ||
            model.items === undefined ||
            itemIndex < 0 ||
            itemIndex > model.items.length
        )
            return new NextResponse('Invalid itemIndex provided', {
                status: 400,
            });
    }

    let imageIndex: string | undefined | number =
        query.get('imageIndex') ?? undefined;
    if (imageIndex !== undefined) {
        imageIndex = parseInt(imageIndex);
        if (
            isNaN(imageIndex) ||
            model.items === undefined ||
            itemIndex === undefined ||
            imageIndex < 0
        )
            return new NextResponse('Invalid imageIndex provided', {
                status: 400,
            });
    }

    return {
        filetype,
        filename,
        id,
        itemIndex,
        imageIndex,
        model,
    };
}
