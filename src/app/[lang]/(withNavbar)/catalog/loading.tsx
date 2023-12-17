import { ThingGrid } from '@/components/ThingGrid';
import { Breadcrumbs } from './_components/Breadcrumbs';

export default async function Loading() {
    return (
        <>
            <Breadcrumbs
                items={[<div key={1} className="skeleton h-8 w-32" />]}
            />
            <ThingGrid>
                <div className="skeleton card card-compact h-80 w-60 max-w-2xl" />
                <div className="skeleton card card-compact h-80 w-60 max-w-2xl" />
                <div className="skeleton card card-compact h-80 w-60 max-w-2xl" />
            </ThingGrid>
        </>
    );
}
