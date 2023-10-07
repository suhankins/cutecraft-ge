import { EditableText } from '../EditableText';
import { Item } from './Item';
import { ImageEditor } from '../Image/ImageEditor';
import { ItemClass } from '@/models/Item';
import { PriceSelectorEditor } from '../PriceSelectorEditor';
import { DeleteButton } from '../DeleteButton';
import { EllipsisMenu } from '../EllipsisMenu';
import { Position } from '@/utils/client/Position';
import { MoveButton } from '../MoveButton';
import { Locale, getLocalizedString } from '@/lib/i18n-config';

export function ItemEditor({
    item,
    categoryId,
    itemIndex,
    position,
    lang,
}: {
    item: ItemClass;
    categoryId: string;
    itemIndex: number;
    position: Position;
    lang: Locale;
}) {
    return (
        <Item
            image={
                <ImageEditor
                    images={item.images}
                    itemIndex={itemIndex}
                    categoryId={categoryId}
                />
            }
            title={
                <EditableText
                    fetchUrl={`/api/category/${categoryId}/items/${itemIndex}/name`}
                    placeholder="Title"
                    valueName={lang}
                    method="PATCH"
                    defaultValue={getLocalizedString(item.name, lang)}
                    textarea={true}
                    className="input-ghost input card-title w-full resize-none overflow-hidden rounded pl-0 pr-0 text-2xl"
                />
            }
            description={
                <EditableText
                    nullable={true}
                    allowNewLine={true}
                    fetchUrl={`/api/category/${categoryId}/items/${itemIndex}/description`}
                    valueName={lang}
                    method="PATCH"
                    placeholder="Description"
                    defaultValue={getLocalizedString(
                        item.description,
                        lang,
                        false
                    )}
                    textarea={true}
                    className="input-ghost input w-full resize-none overflow-hidden rounded pl-0 pr-0"
                />
            }
            priceSelector={
                <PriceSelectorEditor
                    categoryId={categoryId}
                    itemIndex={itemIndex}
                    price={item.price}
                />
            }
        >
            <EllipsisMenu className="absolute top-0 right-0 z-30">
                <li>
                    <DeleteButton
                        aria-label="Delete item"
                        className="btn-square"
                        fetchUrl={`/api/category/${categoryId}/items/${itemIndex}`}
                    />
                </li>
                {position !== 'alone' && (
                    <>
                        {position !== 'first' && (
                            <li>
                                <MoveButton
                                    direction="up"
                                    categoryId={categoryId}
                                    itemIndex={itemIndex}
                                />
                            </li>
                        )}
                        {position !== 'last' && (
                            <li>
                                <MoveButton
                                    direction="down"
                                    categoryId={categoryId}
                                    itemIndex={itemIndex}
                                />
                            </li>
                        )}
                    </>
                )}
            </EllipsisMenu>
        </Item>
    );
}
