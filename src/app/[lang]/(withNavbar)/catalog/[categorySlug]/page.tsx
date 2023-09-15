import { ItemGrid } from '@/components/Item/ItemGrid';
import { MainBodyWidthContainer } from '@/components/MainBodyWidthContainer';
import { getDictionary } from '@/lib/getDictionary';
import { Locale, i18n, getLocalizedString } from '@/lib/i18n-config';
import { CategoryModel } from '@/models/Category';
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

export const revalidate = false;
export async function generateStaticParams() {
    const locales = i18n.locales;
    const categories = await CategoryModel.find();

    return locales.map((locale) => {
        return categories.map((category) => ({
            lang: locale,
            categorySlug: category.slug,
        }));
    });
}

export async function getCategory(slug: string) {
    return await CategoryModel.findOne({ slug: slug });
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
