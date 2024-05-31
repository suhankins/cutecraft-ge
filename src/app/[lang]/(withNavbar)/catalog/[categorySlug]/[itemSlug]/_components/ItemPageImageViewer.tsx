'use client';

import {
    ChevronLeftIcon,
    ChevronRightIcon,
    MagnifyingGlassMinusIcon,
    MagnifyingGlassPlusIcon,
    XMarkIcon,
} from '@heroicons/react/24/outline';
import Image from 'next/image';
import { useState } from 'react';
import Lightbox from 'yet-another-react-lightbox';
import Zoom from 'yet-another-react-lightbox/plugins/zoom';
import 'yet-another-react-lightbox/styles.css';
import { ImageStepper } from './ImageStepper';

export function ItemPageImageViewer({
    images,
    alt,
}: {
    images: string[];
    alt?: string;
}) {
    const [selectedImage, setSelectedImage] = useState(0);
    const [lightboxOpen, setLightboxOpen] = useState(false);

    return (
        <div className="flex w-full flex-col gap-2">
            <figure className="group relative w-full">
                {images[selectedImage] && (
                    <>
                        <button
                            type="button"
                            className="btn btn-square absolute bottom-2 left-2 opacity-50 transition-opacity duration-300 group-hover:opacity-100 md:opacity-0"
                            onClick={() => setLightboxOpen(true)}
                        >
                            <MagnifyingGlassPlusIcon className="h-8 w-8" />
                        </button>
                        <Lightbox
                            open={lightboxOpen}
                            close={() => setLightboxOpen(false)}
                            slides={images.map((image) => ({
                                src: image,
                                alt: alt ?? '',
                            }))}
                            index={selectedImage}
                            on={{
                                view: ({ index }) => setSelectedImage(index),
                            }}
                            plugins={[Zoom]}
                            animation={{ zoom: 500 }}
                            render={{
                                iconPrev: () => (
                                    <ChevronLeftIcon className="h-8 w-8" />
                                ),
                                iconNext: () => (
                                    <ChevronRightIcon className="h-8 w-8" />
                                ),
                                iconClose: () => (
                                    <XMarkIcon className="h-8 w-8" />
                                ),
                                iconZoomIn: () => (
                                    <MagnifyingGlassPlusIcon className="h-8 w-8" />
                                ),
                                iconZoomOut: () => (
                                    <MagnifyingGlassMinusIcon className="h-8 w-8" />
                                ),
                            }}
                        />
                    </>
                )}
                <Image
                    onClick={() => setLightboxOpen(true)}
                    className="w-full cursor-pointer rounded object-contain"
                    src={images[selectedImage] || '/static/placeholder.png'}
                    alt={alt ?? ''}
                    width={480}
                    height={480}
                />
            </figure>
            {images.length > 1 && (
                <ImageStepper
                    selectedImage={selectedImage}
                    setSelectedImage={setSelectedImage}
                    images={images}
                />
            )}
        </div>
    );
}
