'use client';

import { MagnifyingGlassPlusIcon } from '@heroicons/react/24/outline';
import Image from 'next/image';
import { useState } from 'react';

export function ItemPageImageViewer({
    images,
    alt,
}: {
    images: string[];
    alt?: string;
}) {
    const [selectedImage, setSelectedImage] = useState(0);

    return (
        <div className="relative flex w-full flex-col gap-2">
            {images[selectedImage] && (
                <a
                    className="btn-square btn absolute top-2 left-2"
                    href={images[selectedImage]}
                >
                    <MagnifyingGlassPlusIcon className="h-6 w-6" />
                </a>
            )}
            <Image
                className="w-full rounded object-contain"
                src={images[selectedImage] || '/static/placeholder.png'}
                alt={alt ?? ''}
                width={480}
                height={480}
            />
            {images.length > 1 && (
                <div className="flex w-full items-center justify-center gap-2">
                    {images.map((image, index) => (
                        <button
                            type="button"
                            className={`${
                                selectedImage === index
                                    ? 'btn-primary border-4 border-primary'
                                    : ''
                            } btn h-16 w-16 p-0`}
                            onClick={() => setSelectedImage(index)}
                            key={index}
                        >
                            <Image
                                className="w-full rounded object-contain"
                                src={image || '/static/placeholder.png'}
                                alt={alt ?? ''}
                                width={64}
                                height={64}
                            />
                        </button>
                    ))}
                </div>
            )}
        </div>
    );
}
