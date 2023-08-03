import { ItemGrid } from '@/components/Item/ItemGrid';
import { MainBodyWidthContainer } from '@/components/MainBodyWidthContainer';
import { getDictionary } from '@/lib/getDictionary';
import { Locale, i18n, getLocalizedString } from '@/lib/i18n-config';
import { CategoryModel } from '@/models/Category';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { Breadcrumbs } from '../Breadcrumbs';

async function getCategory(slug: string) {
    return await CategoryModel.findOne({ slug: slug });
}

export const revalidate = false;
export async function generateStaticParams() {
    return i18n.locales.map((locale) => ({
        lang: locale,
    }));
}

export default async function Catalog({
    params: { lang, categorySlug },
}: {
    params: { lang: Locale; categorySlug: string };
}) {
    const dictionary = await getDictionary(lang);
    const categories = await getCategory(categorySlug);

    if (!categories) {
        notFound();
    }

    return (
        <MainBodyWidthContainer className="my-4">
            <Breadcrumbs
                items={[
                    <Link href="/catalog">{dictionary.links.catalogLink}</Link>,
                    getLocalizedString(categories.name, lang),
                ]}
            />
            <ItemGrid items={categories.items ?? []} lang={lang} />
        </MainBodyWidthContainer>
    );
}
