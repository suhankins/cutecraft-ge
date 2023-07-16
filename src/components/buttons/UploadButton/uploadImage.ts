export async function getSignedUrlRequest(
    categoryId: string,
    fileExtension: string,
    itemIndex?: number
): Promise<{
    url: string;
    fields: any;
}> {
    const response = await fetch(
        `/api/upload?id=${categoryId}&filetype=${fileExtension}` +
            (itemIndex ? `&itemIndex=${itemIndex}` : '')
    );
    if (response.ok) console.log('Got signed URL successfully!');
    else throw new Error('Failed to get signed URL.');

    return response.json();
}

export async function uploadToGoogleStorage(
    url: string,
    fields: any,
    file: File
) {
    // Converting fields to FormData and combining with file
    const formData = new FormData();
    Object.entries({ ...fields, file }).forEach(([key, value]) => {
        formData.append(key, value as any);
    });

    // There's a chance that CORS might fail for no reason
    // and that will throw an error that will make confirmation not happen.
    // So we're just going to ignore it.
    try {
        const response = await fetch(url, {
            method: 'POST',
            body: formData,
        });
        if (response.ok) console.log('Uploaded successfully!');
        else console.error('Failed to upload.');
    } catch (e) {
        console.error(e);
    }
}

export async function confirmUploadRequest(
    categoryId: string,
    filename: string,
    itemIndex?: number
) {
    const result = await fetch(
        `/api/upload/confirm?id=${categoryId}&filename=${filename}` +
            (itemIndex ? `&itemIndex=${itemIndex}` : ''),
        { method: 'POST' }
    );
    if (result.ok) console.log('Confirmed successfully!');
    else throw new Error('Failed to confirm.');
}
