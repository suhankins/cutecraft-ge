import { googleStorage } from '@/lib/googleStorage';
import { getFileName } from '@/utils/server/getFileName';
import { handleUploadQuery } from '@/app/api/upload/handleUploadQuery';
import { NextRequest, NextResponse } from 'next/server';
import { type GenerateSignedPostPolicyV4Options } from '@google-cloud/storage';

/**
 * Gets a signed URL for uploading an image to Google Cloud Storage
 * @param request should contain the query parameters **id**, **itemIndex**, and **filetype**
 */
export async function GET(request: NextRequest): Promise<NextResponse> {
    const HandledUploadQuery = await handleUploadQuery(request);
    if (HandledUploadQuery instanceof NextResponse) return HandledUploadQuery;
    const { id, itemIndex, filetype } = HandledUploadQuery;
    if (filetype === undefined)
        return NextResponse.json('No filetype provided', { status: 400 });

    const file = googleStorage.file(
        getFileName(id.toString(), filetype, itemIndex)
    );
    const options: GenerateSignedPostPolicyV4Options = {
        expires: Date.now() + 60 * 1000, // 1 minute
        conditions: [
            ['content-length-range', 0, 4_000_000], // 4 MB limit
        ],
        fields: {
            'x-goog-meta-test': 'data',
        },
    };

    const [response] = await file.generateSignedPostPolicyV4(options);
    return NextResponse.json(response, { status: 200 });
}
