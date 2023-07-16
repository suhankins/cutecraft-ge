import { ItemClass } from '@/models/Item';
import { Item } from './Item';
import { PriceSelectorViewer } from '@/components/PriceSelector/PriceSelectorViewer';
import { ImageViewer } from '@/components/Image/ImageViewer';
import { SimpleCategory } from '@/models/Category';
import { Locale, getLocalizedString, mapToObject } from '@/lib/i18n-config';

export function ItemViewer({
    item,
    itemIndex,
    category,
    lang,
}: {
    item: ItemClass;
    itemIndex: number;
    category: SimpleCategory;
    lang: Locale;
}) {
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
            priceSelector={
                <PriceSelectorViewer
                    name={mapToObject(item.name)}
                    categoryId={category._id}
                    itemIndex={itemIndex}
                    sizes={[]} // TODO: Fix price selector viewer
                    prices={[item.price]} // TODO: Fix price selector viewer
                />
            }
        />
    );
}
