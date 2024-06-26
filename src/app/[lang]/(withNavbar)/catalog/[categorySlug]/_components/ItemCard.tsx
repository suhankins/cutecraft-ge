import { ItemClass } from '@/models/Item';
import { Locale, getLocalizedString } from '@/lib/i18n-config';
import Image from 'next/image';
import { ThingCard } from '@/components/ThingCard';
import { Lari } from '@/components/Lari';

export function ItemCard({
    item,
    categorySlug,
    lang,
}: {
    item: ItemClass;
    categorySlug: string;
    lang: Locale;
}) {
    return (
        <ThingCard href={`/catalog/${categorySlug}/${item.slug}`}>
            <figure>
                <Image
                    className="h-full w-full object-cover"
                    src={item.images[0] ?? '/static/placeholder.png'}
                    alt={getLocalizedString(item.name, lang)}
                    width={236}
                    height={236}
                />
            </figure>
            <div className="card-body">
                <h2 className="link-hover card-title block break-words text-2xl">
                    {getLocalizedString(item.name, lang)}
                </h2>
                <div className="justify-end">
                    <p className="text-right text-2xl font-bold">
                        {item.price} <Lari />
                    </p>
                </div>
            </div>
        </ThingCard>
    );
}
