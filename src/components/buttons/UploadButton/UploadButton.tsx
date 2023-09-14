'use client';

import {
    confirmUploadRequest,
    getSignedUrlRequest,
    uploadToGoogleStorage,
} from '@/components/buttons/UploadButton/uploadImage';
import { ChangeEvent, useId, useMemo, useState } from 'react';
import { PhotoIcon } from '@heroicons/react/24/outline';
import { mutate } from 'swr';

export function UploadButton({
    className,
    itemIndex,
    categoryId,
    imageIndex,
}: {
    className?: string;
    itemIndex?: number;
    categoryId: string;
    imageIndex?: number;
}) {
    const fileUploaderId = useId();
    const [loadingText, setLoadingText] = useState<null | string>(null);

    const handleFileChange = async (event: ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file === undefined) return;
        try {
            const fileExtension = file.name.split('.').at(-1) ?? '';

            setLoadingText('Asking permission...');
            const { url, fields } = await getSignedUrlRequest(
                categoryId,
                fileExtension,
                itemIndex,
                imageIndex
            );

            const key = fields.key;
            if (key === undefined) throw new Error('No key in fields');

            setLoadingText('Uploading...');
            await uploadToGoogleStorage(url, fields, file);

            setLoadingText('Confirming...');
            await confirmUploadRequest(categoryId, key, itemIndex, imageIndex);

            setLoadingText('Fetching new data...');
            await mutate('/api/category');
        } catch (error) {
            // TODO: Add toasts for errors
            console.error(error);
        }
        setLoadingText(null);
        event.target.files = null;
    };

    const disabled = useMemo(() => loadingText !== null, [loadingText]);

    return (
        <>
            <label
                className={`btn-primary btn ${
                    loadingText === null && 'btn-square'
                } ${disabled && 'btn-disabled'} ${className}`}
                role="button"
                aria-label="Upload image"
                htmlFor={fileUploaderId}
                tabIndex={0}
                aria-disabled={disabled}
            >
                {loadingText ? (
                    <span>{loadingText}</span>
                ) : (
                    <PhotoIcon className="absolute h-6 w-6" />
                )}
            </label>
            <input
                disabled={disabled}
                type="file"
                id={fileUploaderId}
                className="hidden"
                onChange={handleFileChange}
            />
        </>
    );
}
