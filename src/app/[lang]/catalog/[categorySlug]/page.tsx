import { ItemGrid } from '@/components/Item/ItemGrid';
import { MainBodyWidthContainer } from '@/components/MainBodyWidthContainer';
import { getDictionary } from '@/lib/getDictionary';
import { Locale, i18n, getLocalizedString } from '@/lib/i18n-config';
import { CategoryModel } from '@/models/Category';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { Breadcrumbs } from '../_components/Breadcrumbs';

export async function getCategory(slug: string) {
    return await CategoryModel.findOne({ slug: slug });
}

// TODO: Add revalidate

export default async function Catalog({
    params: { lang, categorySlug },
}: {
    params: { lang: Locale; categorySlug: string };
}) {
    const dictionary = await getDictionary(lang);
    const category = await getCategory(categorySlug);

    if (!category) {
        notFound();
    }

    return (
        <MainBodyWidthContainer className="my-4">
            <Breadcrumbs
                items={[
                    <Link href="/catalog">{dictionary.links.catalogLink}</Link>,
                    getLocalizedString(category.name, lang),
                ]}
            />
            <ItemGrid
                categorySlug={categorySlug}
                items={category.items ?? []}
                lang={lang}
            />
        </MainBodyWidthContainer>
    );
}
