import { getDictionary } from '@/lib/getDictionary';
import {
    Locale,
    getLocalizedString,
    i18n,
    mapToObject,
} from '@/lib/i18n-config';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { Breadcrumbs } from '../../_components/Breadcrumbs';
import { getCategory } from '../page';
import type { Metadata } from 'next';
import { CategoryClass, CategoryModel } from '@/models/Category';
import { ItemPageImageViewer } from './_components/ItemPageImageViewer';
import { MarkdownWrapper } from './_components/MarkdownWrapper';
import { AddToCartButton } from '@/components/buttons/AddToCartButton';
import { ItemClass } from '@/models/Item';
import { Lari } from '@/components/Lari';

interface Params {
    params: { lang: Locale; categorySlug: string; itemSlug: string };
}

async function getCategoryAndItem(
    categorySlug: string,
    itemSlug: string
): Promise<[CategoryClass | null, ItemClass | null, number | undefined]> {
    const category = await getCategory(categorySlug);
    if (!category) return [null, null, undefined];

    const itemIndex = category.items?.findIndex(
        (item) => item.slug === itemSlug
    );
    const item =
        itemIndex !== undefined && itemIndex !== -1
            ? category.items?.at(itemIndex) ?? null
            : null;
    return [category, item, itemIndex];
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
        openGraph: {
            title: getLocalizedString(item.name, lang),
        },
    };
}

export const revalidate = false;

export default async function Catalog({
    params: { lang, categorySlug, itemSlug },
}: Params) {
    const dictionary = await getDictionary(lang);
    const [category, item, itemIndex] = await getCategoryAndItem(
        categorySlug,
        itemSlug
    );

    if (!category || !item || itemIndex === undefined || !('price' in item)) {
        notFound();
    }

    return (
        <>
            <Breadcrumbs
                items={[
                    <Link href="/catalog" key="/catalog">
                        {dictionary.links.catalogLink}
                    </Link>,
                    <Link
                        href={`/catalog/${category.slug}`}
                        key={`/catalog/${category.slug}`}
                    >
                        {getLocalizedString(category.name, lang)}
                    </Link>,
                    getLocalizedString(item.name, lang),
                ]}
            />
            <div className="grid w-full grid-cols-1 gap-8 sm:grid-cols-2">
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
                            {item.price}
                            <Lari />
                        </span>
                        <AddToCartButton
                            cartItem={{
                                name: mapToObject(item.name),
                                price: item.price,
                                categoryId: category.id,
                                itemIndex,
                                quantity: 1,
                            }}
                        />
                    </div>
                </section>
            </div>
        </>
    );
}
