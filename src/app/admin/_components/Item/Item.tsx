export interface ItemParams {
    image?: React.ReactNode;
    title: React.ReactNode;
    description?: React.ReactNode;
    priceSelector: React.ReactNode;
    children?: React.ReactNode;
}

export function Item({
    image,
    title,
    description,
    priceSelector,
    children,
}: ItemParams) {
    return (
        <article className="card card-compact w-full max-w-2xl bg-base-200">
            {children}
            {image}
            <div className="card-body">
                <header className={`flex flex-col gap-4 lg:flex-grow`}>
                    {title}
                    {description}
                </header>
                <div className="flex h-full items-end">{priceSelector}</div>
            </div>
        </article>
    );
}
