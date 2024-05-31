import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/24/outline';
import Image from 'next/image';

export function ImageStepper({
    selectedImage,
    setSelectedImage,
    images,
}: {
    selectedImage: number;
    setSelectedImage: React.Dispatch<React.SetStateAction<number>>;
    images: string[];
}) {
    return (
        <div className="flex w-full items-center justify-center gap-2">
            <button
                onClick={() => {
                    if (selectedImage <= 0) return;
                    setSelectedImage(selectedImage - 1);
                }}
                className="btn btn-ghost h-full px-0"
            >
                <ChevronLeftIcon className="h-8 w-8" />
            </button>
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
                        alt=""
                        width={64}
                        height={64}
                    />
                </button>
            ))}
            <button
                onClick={() => {
                    if (selectedImage >= images.length - 1) return;
                    setSelectedImage(selectedImage + 1);
                }}
                className="btn btn-ghost h-full px-0"
            >
                <ChevronRightIcon className="h-8 w-8" />
            </button>
        </div>
    );
}
