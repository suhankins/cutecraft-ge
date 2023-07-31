import { ItemClass } from '@/models/Item';
import { Item } from './Item';
import { SimpleCategory } from '@/models/Category';
import { Locale, getLocalizedString, mapToObject } from '@/lib/i18n-config';

export function ItemViewer({ item, lang }: { item: ItemClass; lang: Locale }) {
    return (
        <Item
            image={
                item.images && (
                    /*<ImageViewer
                        src={item.image}
                        alt={getLocalizedString(item.name, lang)}
                    />*/
                    <span>TODO: Fix</span>
                )
            }
            title={
                <h3 className="card-title text-2xl">
                    {getLocalizedString(item.name, lang)}
                </h3>
            }
            description={
                <p>{getLocalizedString(item.description, lang, false)}</p>
            }
            priceSelector={item.price}
        />
    );
}
