import { Locale } from '@/lib/i18n-config';
import { ItemViewer } from './ItemViewer';
import { ItemClass } from '@/models/Item';

export function ItemGrid({
    items,
    lang,
}: {
    items: ItemClass[];
    lang: Locale;
}) {
    return (
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
            {items.map((item, index) => (
                <ItemViewer key={index} item={item} lang={lang} />
            ))}
        </div>
    );
}
