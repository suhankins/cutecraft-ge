'use client';

import { useSearchParams } from 'next/navigation';

export function OrderId() {
    const searchParams = useSearchParams();

    return <>{searchParams.get('orderId')}</>;
}
