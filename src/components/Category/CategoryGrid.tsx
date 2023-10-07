import { SimpleCategory } from '@/models/Category';
import { CategoryViewer } from './CategoryViewer';
import { Locale } from '@/lib/i18n-config';

export function CategoryGrid({
    categories,
    lang,
}: {
    categories: SimpleCategory[];
    lang: Locale;
}) {
    return (
        <section className="grid w-full grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">
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
