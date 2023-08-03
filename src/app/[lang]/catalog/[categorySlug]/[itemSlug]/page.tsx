import { MainBodyWidthContainer } from '@/components/MainBodyWidthContainer';
import { getDictionary } from '@/lib/getDictionary';
import { Locale, getLocalizedString } from '@/lib/i18n-config';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { Breadcrumbs } from '../../_components/Breadcrumbs';
import { getCategory } from '../page';

async function getCategoryAndItem(categorySlug: string, itemSlug: string) {
    const category = await getCategory(categorySlug);
    if (!category) return [null, null];

    const item = category.items?.find((item) => item.slug === itemSlug);
    return [category, item];
}

// TODO: Add revalidate

export default async function Catalog({
    params: { lang, categorySlug, itemSlug },
}: {
    params: { lang: Locale; categorySlug: string; itemSlug: string };
}) {
    const dictionary = await getDictionary(lang);
    const [category, item] = await getCategoryAndItem(categorySlug, itemSlug);

    if (!category || !item) {
        notFound();
    }

    return (
        <MainBodyWidthContainer className="my-4">
            <Breadcrumbs
                items={[
                    <Link href="/catalog">{dictionary.links.catalogLink}</Link>,
                    <Link href={`/catalog/${category.slug}`}>
                        {getLocalizedString(category.name, lang)}
                    </Link>,
                    getLocalizedString(item.name, lang),
                ]}
            />
            Item page goes here
        </MainBodyWidthContainer>
    );
}
