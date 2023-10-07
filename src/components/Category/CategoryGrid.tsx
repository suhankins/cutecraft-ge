import { SimpleCategory } from '@/models/Category';
import { CategoryViewer } from './CategoryViewer';
import { Locale } from '@/lib/i18n-config';
import { ThingGrid } from '../ThingGrid';

export function CategoryGrid({
    categories,
    lang,
}: {
    categories: SimpleCategory[];
    lang: Locale;
}) {
    return (
        <ThingGrid>
            {categories
                ?.sort((a, b) => (b.index ?? 0) - (a.index ?? 0))
                .map((category, index) => (
                    <CategoryViewer
                        lang={lang}
                        key={index}
                        category={category}
                    />
                ))}
        </ThingGrid>
    );
}
