import { SimpleCategory } from '@/models/Category';
import { Locale, getLocalizedString } from '@/lib/i18n-config';
import Image from 'next/image';
import { ThingCard } from '../ThingCard';

export interface CategoryProps {
    lang: Locale;
    category: SimpleCategory;
}

export function CategoryViewer({ category, lang }: CategoryProps) {
    return (
        <ThingCard href={`/catalog/${category.slug}`}>
            {category.image && (
                <figure>
                    <Image
                        width={312}
                        height={312}
                        alt={getLocalizedString(category.name, lang)}
                        className="aspect-square h-full max-h-64 w-full rounded-t-xl bg-base-300 object-cover"
                        src={category.image}
                    />
                </figure>
            )}
            <div className="card-body">
                <h2 className="link-hover card-title block break-words text-2xl">
                    {getLocalizedString(category.name, lang)}
                </h2>
            </div>
        </ThingCard>
    );
}
