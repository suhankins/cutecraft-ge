import { MainBodyWidthContainer } from '@/components/MainBodyWidthContainer';
import { getDictionary } from '@/lib/getDictionary';
import { Locale, getLocalizedString, i18n } from '@/lib/i18n-config';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { Breadcrumbs } from '../../_components/Breadcrumbs';
import { getCategory } from '../page';
import { ShoppingCartIcon } from '@heroicons/react/24/outline';
import type { Metadata } from 'next';
import { CategoryClass, CategoryModel } from '@/models/Category';
import { ItemPageImageViewer } from './_components/ItemPageImageViewer';
import { MarkdownWrapper } from './_components/MarkdownWrapper';

interface Params {
    params: { lang: Locale; categorySlug: string; itemSlug: string };
}

async function getCategoryAndItem(categorySlug: string, itemSlug: string) {
    const category = await getCategory(categorySlug);
    if (!category) return [null, null];

    const item = category.items?.find((item) => item.slug === itemSlug);
    return [category, item];
}

export async function generateMetadata({
    params: { lang, categorySlug, itemSlug },
}: Params): Promise<Metadata> {
    const [category, item] = await getCategoryAndItem(categorySlug, itemSlug);

    if (!category || !item || !('price' in item)) {
        notFound();
    }

    return {
        title: getLocalizedString(item.name, lang),
    };
}

export const revalidate = false;
export async function generateStaticParams() {
    const locales = i18n.locales;
    const categories = (await CategoryModel.find()) as CategoryClass[];

    return locales.map((locale) => {
        return categories.map((category) => {
            return category.items?.map((item) => ({
                lang: locale,
                categorySlug: category.slug,
                itemSlug: item.slug,
            }));
        });
    });
}

export default async function Catalog({
    params: { lang, categorySlug, itemSlug },
}: Params) {
    const dictionary = await getDictionary(lang);
    const [category, item] = await getCategoryAndItem(categorySlug, itemSlug);

    if (!category || !item || !('price' in item)) {
        notFound();
    }

    return (
        <>
            <Breadcrumbs
                items={[
                    <Link href={`/${lang}/catalog`}>
                        {dictionary.links.catalogLink}
                    </Link>,
                    <Link href={`/${lang}/catalog/${category.slug}`}>
                        {getLocalizedString(category.name, lang)}
                    </Link>,
                    getLocalizedString(item.name, lang),
                ]}
            />
            <main className="grid grid-cols-1 gap-8 sm:grid-cols-2">
                <section>
                    <ItemPageImageViewer
                        images={item.images}
                        alt={getLocalizedString(item.name, lang)}
                    />
                </section>
                <section className="flex flex-col gap-4">
                    <h1 className="text-4xl font-bold">
                        {getLocalizedString(item.name, lang)}
                    </h1>
                    <div className="prose">
                        <MarkdownWrapper gfm>
                            {getLocalizedString(item.description, lang)}
                        </MarkdownWrapper>
                    </div>
                    <div className="flex items-center gap-4">
                        <span className="text-3xl font-bold">
                            {item.price}&#8382;
                        </span>
                        <button className="btn-primary btn-square btn">
                            {/* TODO: Add item to cart */}
                            <ShoppingCartIcon className="h-8 w-6" />
                        </button>
                    </div>
                </section>
            </main>
        </>
    );
}
