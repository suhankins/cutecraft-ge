import { ItemGrid } from './_components/ItemGrid';
import { getDictionary } from '@/lib/getDictionary';
import { Locale, i18n, getLocalizedString } from '@/lib/i18n-config';
import { CategoryClass, CategoryModel } from '@/models/Category';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { Breadcrumbs } from '../_components/Breadcrumbs';
import type { Metadata } from 'next';

interface Params {
    params: { lang: Locale; categorySlug: string };
}

export async function generateMetadata({
    params: { lang, categorySlug },
}: Params): Promise<Metadata> {
    const category = await getCategory(categorySlug);

    if (!category) {
        notFound();
    }

    return {
        title: getLocalizedString(category.name, lang),
    };
}

export async function getCategory(slug: string) {
    return (await CategoryModel.findOne({ slug: slug })) as CategoryClass;
}

export default async function Catalog({
    params: { lang, categorySlug },
}: Params) {
    const dictionary = await getDictionary(lang);
    const category = await getCategory(categorySlug);

    if (!category) {
        notFound();
    }

    return (
        <>
            <Breadcrumbs
                items={[
                    <Link href={`/${lang}/catalog`} key={`/${lang}/catalog`}>
                        {dictionary.links.catalogLink}
                    </Link>,
                    getLocalizedString(category.name, lang),
                ]}
            />
            <ItemGrid
                categorySlug={categorySlug}
                items={category.items ?? []}
                lang={lang}
            />
        </>
    );
}
