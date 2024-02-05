import { CategoryGrid } from '@/components/Category/CategoryGrid';
import { getDictionary } from '@/lib/getDictionary';
import { Locale, i18n } from '@/lib/i18n-config';
import { CategoryModel, SimpleCategory } from '@/models/Category';
import { Breadcrumbs } from './_components/Breadcrumbs';
import type { Metadata } from 'next';

interface Params {
    params: { lang: Locale };
}

export async function generateMetadata({
    params: { lang },
}: Params): Promise<Metadata> {
    const dictionary = await getDictionary(lang);

    return {
        ...dictionary.openGraph.catalog,
    };
}

async function getCategories() {
    const categories = (
        await CategoryModel.find().sort([['priority', 'desc']])
    ).map((category) => category.toObject() as SimpleCategory);
    return categories;
}

export default async function Catalog({ params: { lang } }: Params) {
    const dictionary = await getDictionary(lang);
    const categories = await getCategories();

    return (
        <>
            <Breadcrumbs items={[dictionary.links.catalogLink]} />
            <CategoryGrid categories={categories} lang={lang} />
        </>
    );
}
