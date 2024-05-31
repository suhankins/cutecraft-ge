'use client';

import { useState } from 'react';
import { EditableText } from './EditableText';
import { Lari } from '@/components/Lari';

export interface PriceSelectorEdtiorProps {
    categoryId: string;
    itemIndex: number;
    price: number;
}

export function PriceSelectorEditor({
    categoryId,
    itemIndex,
    price,
}: PriceSelectorEdtiorProps) {
    const [loading, setLoading] = useState(false);

    return (
        <p className="flex w-16 flex-nowrap items-center py-4 text-center text-3xl font-bold">
            <EditableText
                nullable={true}
                disabled={loading}
                setLoading={setLoading}
                defaultValue={price.toString()}
                type="number"
                className="input input-ghost w-10 rounded px-0 py-1 text-right text-3xl font-bold focus:text-center"
                fetchUrl={`/api/category/${categoryId}/items/${itemIndex}/price/`}
            />
            <span>
                <Lari />
            </span>
        </p>
    );
}
