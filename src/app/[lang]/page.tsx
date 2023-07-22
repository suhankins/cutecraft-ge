import { CategoryModel, SimpleCategory } from '@/models/Category';
import { getDictionary } from '@/lib/getDictionary';
import { Locale, i18n } from '@/lib/i18n-config';
import { Hero } from './components/Hero';
import { CategoryGrid } from '@/components/Category/CategoryGrid';
import { MainBodyWidthContainer } from '@/components/MainBodyWidthContainer';
import { ContactUs } from './components/ContactUs';

async function getCategories() {
    const categories = (await CategoryModel.find()).map(
        (category) => category.toObject() as SimpleCategory
    );
    return categories;
}

export const revalidate = false;
export async function generateStaticParams() {
    return i18n.locales.map((locale) => ({
        lang: locale,
    }));
}

export default async function Home({
    params: { lang },
}: {
    params: { lang: Locale };
}) {
    const categories = await getCategories();
    const dictionary = await getDictionary(lang);

    return (
        <>
            <Hero dictionary={dictionary.hero} />
            <MainBodyWidthContainer>
                <CategoryGrid categories={categories} lang={lang} />
                <button className="btn-primary btn-wide btn mx-auto">
                    {dictionary.seeMore}
                </button>
            </MainBodyWidthContainer>
            <ContactUs dictionary={dictionary.contactUs} />
        </>
    );
}
