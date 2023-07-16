import { SimpleCategory } from '@/models/Category';
import { CategoryViewer } from './CategoryViewer';
import { Locale } from '@/lib/i18n-config';

export function CategoryGrid({
    categories,
    lang,
    className,
}: {
    categories: SimpleCategory[];
    lang: Locale;
    className?: string;
}) {
    return (
        <section
            className={`grid w-full grid-cols-2 gap-2 md:grid-cols-3 lg:grid-cols-4 ${
                className ?? ''
            }`}
        >
            {categories
                ?.sort((a, b) => (b.index ?? 0) - (a.index ?? 0))
                .map((category, index) => (
                    <CategoryViewer
                        lang={lang}
                        key={index}
                        category={category}
                    />
                ))}
        </section>
    );
}
