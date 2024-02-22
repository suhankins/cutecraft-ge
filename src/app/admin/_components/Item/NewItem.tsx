import { newItem } from '@/utils/client/new/newItem';
import { PlusIcon } from '@heroicons/react/24/outline';
import { useState } from 'react';
import { useSWRConfig } from 'swr';

export function NewItem({
    categoryId,
    className = '',
}: {
    categoryId: string;
    className?: string;
}) {
    const [loading, setLoading] = useState(false);
    const { mutate } = useSWRConfig();
    const handleNewItemClick = async () => {
        try {
            setLoading(true);
            await newItem(categoryId);
            await mutate('/api/category');
            setLoading(false);
        } catch (e) {
            // TODO: Add toasts for errors
            console.error(e);
        }
    };
    return (
        <button
            className={`btn-success btn h-full w-full ${
                loading && 'loading'
            } ${className}`}
            disabled={loading}
            onClick={handleNewItemClick}
        >
            <PlusIcon className="h-6 w-6" />
            New item
        </button>
    );
}
