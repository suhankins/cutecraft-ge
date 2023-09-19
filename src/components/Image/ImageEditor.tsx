import { DeleteButton } from '../buttons/DeleteButton';
import { ImageViewer } from './ImageViewer';
import { UploadButton } from '../buttons/UploadButton/UploadButton';
import { ImageView } from './ImageView';

export interface EditableImageProps {
    images: string[];
    itemIndex: number;
    categoryId: string;
}

function ImageWithControls({
    image,
    itemIndex,
    categoryId,
    imageIndex,
    deleteDisabled,
}: {
    image: string;
    itemIndex: number;
    categoryId: string;
    imageIndex: number;
    deleteDisabled?: boolean;
}) {
    return (
        <>
            <div className="invisible absolute left-1 top-1 z-30 flex gap-1 group-hover:visible">
                <UploadButton
                    imageIndex={imageIndex}
                    itemIndex={itemIndex}
                    categoryId={categoryId}
                />
                {!deleteDisabled && (
                    <DeleteButton
                        aria-label="Delete image"
                        fetchUrl={`/api/category/${categoryId}/items/${itemIndex}/images/${imageIndex}`}
                    />
                )}
            </div>
            <ImageViewer src={image} />
        </>
    );
}

export function ImageEditor({
    images,
    itemIndex,
    categoryId,
}: EditableImageProps) {
    const imagesToRender = [
        ...images.map((image, imageIndex) => (
            <ImageWithControls
                key={imageIndex}
                image={image}
                itemIndex={itemIndex}
                categoryId={categoryId}
                imageIndex={imageIndex}
            />
        )),
        <ImageWithControls
            key={images.length}
            image={'/static/plus.png'}
            itemIndex={itemIndex}
            categoryId={categoryId}
            imageIndex={images.length}
            deleteDisabled
        />,
    ];
    return <ImageView images={imagesToRender} />;
}
