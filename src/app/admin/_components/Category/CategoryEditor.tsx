import { SimpleCategory } from '@/models/Category';
import { ItemEditor } from '../Item/ItemEditor';
import { EditableText } from '../EditableText';
import { Category } from './Category';
import { NewItem } from '../Item/NewItem';
import { DeleteButton } from '../DeleteButton';
import { EllipsisMenu } from '../EllipsisMenu';
import { MoveButton } from '../MoveButton';
import { Position, getPosition } from '@/utils/client/Position';
import { Locale, getLocalizedString } from '@/lib/i18n-config';
import { UploadButton } from '../UploadButton/UploadButton';

export function CategoryEditor({
    lang,
    category,
    position,
    id,
}: {
    lang: Locale;
    category: SimpleCategory;
    position: Position;
    id?: string;
}) {
    return (
        <Category
            id={id}
            title={
                <>
                    <EditableText
                        defaultValue={getLocalizedString(category.name, lang)}
                        valueName={lang}
                        method="PATCH"
                        fetchUrl={`/api/category/${category._id}/name`}
                        className="xs:w-64 input-bordered input w-48 text-center text-xl font-bold"
                        placeholder="Category name"
                    />
                    <EllipsisMenu>
                        <li>
                            <DeleteButton
                                fetchUrl={`/api/category/${category._id}`}
                            />
                        </li>
                        {position !== 'alone' && (
                            <>
                                {position !== 'first' && (
                                    <li>
                                        <MoveButton
                                            direction="up"
                                            categoryId={category._id}
                                        />
                                    </li>
                                )}
                                {position !== 'last' && (
                                    <li>
                                        <MoveButton
                                            direction="down"
                                            categoryId={category._id}
                                        />
                                    </li>
                                )}
                            </>
                        )}
                        <li>
                            <EditableText
                                defaultValue={category.depth?.toString() ?? '0'}
                                fetchUrl={`/api/category/${category._id}/depth`}
                                type="number"
                                className="input-bordered input w-32"
                                placeholder="Depth"
                            />
                        </li>
                        <li>
                            <UploadButton categoryId={category._id} />
                        </li>
                    </EllipsisMenu>
                </>
            }
        >
            {category.items &&
                category.items.map((item, index, array) => (
                    <ItemEditor
                        lang={lang}
                        position={getPosition(index, array.length)}
                        itemIndex={index}
                        categoryId={category._id}
                        item={item}
                        key={index}
                    />
                ))}
            <NewItem categoryId={category._id} />
        </Category>
    );
}
