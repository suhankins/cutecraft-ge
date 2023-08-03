import { CategoryGrid } from '@/components/Category/CategoryGrid';
import { MainBodyWidthContainer } from '@/components/MainBodyWidthContainer';
import { getDictionary } from '@/lib/getDictionary';
import { Locale, i18n } from '@/lib/i18n-config';
import { CategoryModel, SimpleCategory } from '@/models/Category';
import { Breadcrumbs } from './_components/Breadcrumbs';

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
    const dictionary = await getDictionary(lang);
    const categories = await getCategories();

    return (
        <MainBodyWidthContainer className="my-4">
            <Breadcrumbs items={[dictionary.links.catalogLink]} />
            <CategoryGrid categories={categories} lang={lang} />
        </MainBodyWidthContainer>
    );
}
