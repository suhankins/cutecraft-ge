import {
    ArrowDownIcon,
    ArrowLeftIcon,
    ArrowRightIcon,
    ArrowUpIcon,
} from '@heroicons/react/24/outline';
import { useMemo, useState } from 'react';
import { mutate } from 'swr';

type MoveButtonProps = {
    className?: string;
    categoryId: string;
    direction: 'up' | 'down' | 'left' | 'right';
    itemIndex?: number;
    imageIndex?: number;
};

function Arrow({ direction }: { direction: 'up' | 'down' | 'left' | 'right' }) {
    switch (direction) {
        case 'up':
            return <ArrowUpIcon className="h-6 w-6" />;
        case 'down':
            return <ArrowDownIcon className="h-6 w-6" />;
        case 'left':
            return <ArrowLeftIcon className="h-6 w-6" />;
        case 'right':
            return <ArrowRightIcon className="h-6 w-6" />;
    }
}

export function MoveButton({
    className = '',
    itemIndex,
    categoryId,
    imageIndex,
    direction,
}: MoveButtonProps) {
    const [loading, setLoading] = useState(false);

    const fetchUrl = useMemo(() => {
        if (itemIndex !== undefined) {
            if (imageIndex !== undefined) {
                return `/api/category/${categoryId}/items/${itemIndex}/images/${imageIndex}/move?direction=${direction}`;
            }
            return `/api/category/${categoryId}/items/${itemIndex}/move?direction=${direction}`;
        }
        return `/api/category/${categoryId}/move?direction=${direction}`;
    }, [categoryId, direction, itemIndex, imageIndex]);

    const handleClick = async () => {
        setLoading(true);
        const result = await fetch(fetchUrl, {
            method: 'PATCH',
        });
        if (result.status === 200) {
            await mutate('/api/category');
        } else {
            // TODO: Add toasts for errors
            console.error(await result.text());
        }
        setLoading(false);
    };
    return (
        <button
            onClick={handleClick}
            disabled={loading}
            type="button"
            className={`btn btn-square btn-primary content-center ${
                className ?? ''
            } ${loading && 'loading'}`}
        >
            <Arrow direction={direction} />
        </button>
    );
}
