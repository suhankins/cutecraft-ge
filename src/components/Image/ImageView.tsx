'use client';

import { useState } from 'react';
import Image from 'next/image';

export function ImageView({ images }: { images: React.ReactNode[] }) {
    const [currentImage, setCurrentImage] = useState(0);

    return (
        <figure className="group relative w-full">
            {images[currentImage] ?? (
                <Image
                    width={312}
                    height={312}
                    alt=""
                    className="aspect-square h-full max-h-64 w-full rounded-t-xl bg-base-300 object-cover"
                    src="/images/placeholder.png"
                />
            )}
            {images.length > 1 && (
                <div className="absolute bottom-0 flex items-center justify-center gap-2 rounded-t-lg bg-black/10 p-2">
                    {images.map((_, index) => (
                        <input
                            type="radio"
                            aria-label={`Select image ${index + 1}`}
                            className="radio-accent radio"
                            checked={index === currentImage}
                            onChange={() => setCurrentImage(index)}
                        />
                    ))}
                </div>
            )}
        </figure>
    );
}
