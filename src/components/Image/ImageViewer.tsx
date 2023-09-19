import Image from 'next/image';
import { ImageView } from './ImageView';

export function ImageViewer({
    src: picture,
    alt: altText,
}: {
    src: string;
    alt?: string;
}) {
    return (
        <ImageView
            images={[
                <Image
                    width={312}
                    height={312}
                    key={picture}
                    alt={altText ?? ''}
                    className="aspect-square h-full max-h-64 w-full rounded-t-xl bg-base-300 object-cover"
                    src={picture}
                />,
            ]}
        />
    );
}
