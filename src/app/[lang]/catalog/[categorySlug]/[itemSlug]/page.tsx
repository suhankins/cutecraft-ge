import { MainBodyWidthContainer } from '@/components/MainBodyWidthContainer';
import { getDictionary } from '@/lib/getDictionary';
import { Locale, getLocalizedString } from '@/lib/i18n-config';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { Breadcrumbs } from '../../_components/Breadcrumbs';
import { getCategory } from '../page';
import { ShoppingCartIcon } from '@heroicons/react/24/outline';

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

    if (!category || !item || !('price' in item)) {
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
            <main className="grid grid-cols-1 gap-8 sm:grid-cols-2">
                <section>
                    <img
                        className="w-full rounded object-contain"
                        src={item.images[0] || '/static/placeholder.png'}
                        alt={getLocalizedString(item.name, lang)}
                    />
                </section>
                <section className="flex flex-col gap-4">
                    <h1 className="text-4xl font-bold">
                        {getLocalizedString(item.name, lang)}
                    </h1>
                    <p>{getLocalizedString(item.description, lang)}</p>
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
        </MainBodyWidthContainer>
    );
}
