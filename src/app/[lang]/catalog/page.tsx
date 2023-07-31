import { CategoryGrid } from '@/components/Category/CategoryGrid';
import { MainBodyWidthContainer } from '@/components/MainBodyWidthContainer';
import { Locale, i18n } from '@/lib/i18n-config';
import { CategoryModel, SimpleCategory } from '@/models/Category';

async function getCategories() {
    const categories = (await CategoryModel.find()).map(
        (category) => category.toObject() as SimpleCategory
    );
    return categories;
}

export const revalidate = false;
export async function generateStaticParams() {
    return i18n.locales.map((locale) => ({
        lang: locale,
    }));
}

export default async function Catalog({
    params: { lang },
}: {
    params: { lang: Locale };
}) {
    const categories = await getCategories();

    return (
        <MainBodyWidthContainer className="my-4">
            <CategoryGrid categories={categories} lang={lang} />
        </MainBodyWidthContainer>
    );
}
