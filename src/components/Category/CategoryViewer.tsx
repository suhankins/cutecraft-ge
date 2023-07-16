import { SimpleCategory } from '@/models/Category';
import { Locale, getLocalizedString } from '@/lib/i18n-config';
import { ImageViewer } from '../Image/ImageViewer';
import Link from 'next/link';

export interface CategoryProps {
    lang: Locale;
    category: SimpleCategory;
}

export function CategoryViewer({ category, lang }: CategoryProps) {
    return (
        <Link
            href={`/category/${category.slug}`}
            className="card card-compact w-full max-w-2xl bg-base-200"
        >
            {category.image && (
                <ImageViewer
                    src={category.image}
                    alt={getLocalizedString(category.name, lang)}
                />
            )}
            <div className="card-body">
                <header className={`flex flex-col gap-4 lg:flex-grow`}>
                    <span className="link-hover link text-center text-xl font-bold">
                        {getLocalizedString(category.name, lang)}
                    </span>
                </header>
            </div>
        </Link>
    );
}
