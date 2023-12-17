import { Breadcrumbs } from '../../_components/Breadcrumbs';

export default async function Loading() {
    return (
        <>
            <Breadcrumbs
                items={[
                    <div key={1} className="skeleton h-8 w-32 rounded" />,
                    <div key={1} className="skeleton h-8 w-32 rounded" />,
                    <div key={1} className="skeleton h-8 w-32 rounded" />,
                ]}
            />
            <div className="grid w-full grid-cols-1 gap-8 sm:grid-cols-2">
                <section>
                    <div className="skeleton aspect-square w-full" />
                </section>
                <section className="flex flex-col gap-4">
                    <div className="skeleton h-16 w-32" />
                    <div className="skeleton h-32 w-full" />
                    <div className="flex items-center gap-4">
                        <span className="skeleton h-16 w-16" />
                        <div className="skeleton btn-square" />
                    </div>
                </section>
            </div>
        </>
    );
}
