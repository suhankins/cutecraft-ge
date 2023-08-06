import { ItemClass } from '@/models/Item';
import { Locale, getLocalizedString } from '@/lib/i18n-config';
import Link from 'next/link';

export function ItemViewer({
    item,
    categorySlug,
    lang,
}: {
    item: ItemClass;
    categorySlug: string;
    lang: Locale;
}) {
    return (
        <Link
            href={`/catalog/${categorySlug}/${item.slug}`}
            className="card-compact card w-full max-w-2xl bg-base-200"
        >
            <figure>
                <img
                    className="h-full w-full object-cover"
                    src={item.images[0] ?? '/static/placeholder.png'}
                    alt={getLocalizedString(item.name, lang)}
                    aria-visible={!!item.images[0]}
                />
            </figure>
            <div className="card-body">
                <h2 className="link-hover card-title text-2xl">
                    {getLocalizedString(item.name, lang)}
                </h2>
                <p>{getLocalizedString(item.description, lang)}</p>
                <div className="justify-end">
                    <p className="text-right text-2xl font-bold">
                        {item.price} &#8382;{/* Georgian lari symbol */}
                    </p>
                </div>
            </div>
        </Link>
    );
}
