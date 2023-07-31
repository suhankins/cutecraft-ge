import { ItemGrid } from '@/components/Item/ItemGrid';
import { MainBodyWidthContainer } from '@/components/MainBodyWidthContainer';
import { Locale, i18n } from '@/lib/i18n-config';
import { CategoryModel } from '@/models/Category';
import { notFound } from 'next/navigation';

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
    const categories = await getCategory(categorySlug);

    if (!categories) {
        notFound();
    }

    return (
        <MainBodyWidthContainer className="my-4">
            <ItemGrid items={categories.items ?? []} lang={lang} />
        </MainBodyWidthContainer>
    );
}
