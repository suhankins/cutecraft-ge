import { Locale } from '@/lib/i18n-config';
import { ItemCard } from './ItemCard';
import { ItemClass } from '@/models/Item';
import { ThingGrid } from '@/components/ThingGrid';

export function ItemGrid({
    items,
    categorySlug,
    lang,
}: {
    items: ItemClass[];
    categorySlug: string;
    lang: Locale;
}) {
    return (
        <ThingGrid>
            {items.map((item, index) => (
                <ItemCard
                    key={index}
                    categorySlug={categorySlug}
                    item={item}
                    lang={lang}
                />
            ))}
        </ThingGrid>
    );
}
