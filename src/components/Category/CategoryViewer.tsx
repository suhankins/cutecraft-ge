import { SimpleCategory } from '@/models/Category';
import { Locale, getLocalizedString } from '@/lib/i18n-config';
import Link from 'next/link';
import Image from 'next/image';

export interface CategoryProps {
    lang: Locale;
    category: SimpleCategory;
}

export function CategoryViewer({ category, lang }: CategoryProps) {
    return (
        <Link
            href={`/${lang}/catalog/${category.slug}`}
            className="card card-compact w-60 max-w-2xl bg-base-200"
        >
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
                <h2 className="link-hover card-title text-2xl">
                    {getLocalizedString(category.name, lang)}
                </h2>
            </div>
        </Link>
    );
}
