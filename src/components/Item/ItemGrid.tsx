import { Locale } from '@/lib/i18n-config';
import { ItemViewer } from './ItemViewer';
import { ItemClass } from '@/models/Item';

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
        <section className="grid w-full grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">
            {items.map((item, index) => (
                <ItemViewer
                    key={index}
                    categorySlug={categorySlug}
                    item={item}
                    lang={lang}
                />
            ))}
        </section>
    );
}
